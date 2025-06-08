import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateShortenedUrlDto } from './dto/create-shortened-url.dto';
import { UpdateShortenedUrlDto } from './dto/update-shortened-url.dto';
import { isURL, isUUID } from 'class-validator';
import { InjectRepository } from '@nestjs/typeorm';
import { ShortenedUrl } from './entities/shortened-url.entity';
import { Repository } from 'typeorm';
import { ENVCONFIG } from 'src/config/env.config';
import { RandomCodeUtil } from 'src/utils/random-code.util';
import { Request } from 'express';

@Injectable()
export class ShortenedUrlService {
  constructor(
    @InjectRepository(ShortenedUrl)
    private readonly shortenedUrlRepository: Repository<ShortenedUrl>,
    private readonly randomCodeUtils: RandomCodeUtil,
  ) {}

  async create(createShortenedUrlDto: CreateShortenedUrlDto, req: Request) {
    const { originalUrl } = createShortenedUrlDto;
    const { user } = req;

    if (!isURL(originalUrl)) {
      throw new BadRequestException('URL inválida');
    }

    let shortUrl: string;

    // Gera um código aleatório para URL encurtada e verifica se já existe uma URL encurtada com o mesmo código
    do {
      const randomCode = this.randomCodeUtils.generate();
      shortUrl = `${ENVCONFIG.BACKEND_URL}/${randomCode}`;
    } while (
      await this.shortenedUrlRepository.findOne({
        where: { short_url: shortUrl },
      })
    );

    const shortenedUrl = this.shortenedUrlRepository.create({
      original_url: originalUrl,
      short_url: shortUrl,
      // Associa o usuário à URL encurtada, se estiver autenticado
      ...(user && { user: { id: user.id } }),
    });

    return this.shortenedUrlRepository.save(shortenedUrl);
  }

  findAll(req: Request) {
    const { user } = req;

    // Buscar somente URLs que pertencem ao usuário autenticado
    return this.shortenedUrlRepository.find({
      where: { user: { id: user.id } },
    });
  }

  async update({
    id,
    req,
    updateShortenedUrlDto,
  }: {
    id: string;
    req: Request;
    updateShortenedUrlDto: UpdateShortenedUrlDto;
  }) {
    const isValidId = isUUID(id);

    if (!isValidId || !id) {
      throw new BadRequestException('ID inválido');
    }

    const { originalUrl } = updateShortenedUrlDto;
    const { user } = req;

    if (!originalUrl) {
      throw new BadRequestException('A URL é obrigatória');
    }

    const existingUrl = await this.shortenedUrlRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    // Verifica se a URL existe e se pertence ao usuário que está tentando atualizar
    if (!existingUrl || existingUrl.user?.id !== user.id) {
      throw new BadRequestException('URL não encontrada');
    }

    const newShortUrl = this.shortenedUrlRepository.create({
      original_url: updateShortenedUrlDto.originalUrl,
    });

    const shortUrlMerged = this.shortenedUrlRepository.merge(existingUrl, {
      original_url: newShortUrl.original_url,
    });

    const updated = await this.shortenedUrlRepository.save(shortUrlMerged);
    delete updated.user;

    return updated;
  }

  async remove(id: string, req: Request) {
    const isValidId = isUUID(id);

    if (!isValidId || !id) {
      throw new BadRequestException('ID inválido');
    }
    const { user } = req;

    const deleted = await this.shortenedUrlRepository.softDelete({
      id,
      user: { id: user.id },
    });

    if (deleted.affected === 0) {
      throw new BadRequestException(
        'URL não encontrada ou não pertence ao usuário',
      );
    }

    return { message: 'URL removida com sucesso' };
  }
}
