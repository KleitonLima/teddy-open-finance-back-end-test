import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateShortenedUrlDto } from './dto/create-shortened-url.dto';
import { UpdateShortenedUrlDto } from './dto/update-shortened-url.dto';
import { isURL } from 'class-validator';
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

  create(createShortenedUrlDto: CreateShortenedUrlDto, req: Request) {
    const { originalUrl } = createShortenedUrlDto;

    if (!isURL(originalUrl)) {
      throw new BadRequestException('URL inválida');
    }

    const randomCode = this.randomCodeUtils.generate();
    const shortUrl = ENVCONFIG.BASE_URL + '/' + randomCode;

    const user = req.user;

    const shortenedUrl = this.shortenedUrlRepository.create({
      original_url: originalUrl,
      short_url: shortUrl,
      ...(user && { user: { id: user.id } }),
    });

    return this.shortenedUrlRepository.save(shortenedUrl);
  }

  findAll(req: Request) {
    const { user } = req;

    if (!user) {
      throw new BadRequestException('Usuário não autenticado');
    }

    return this.shortenedUrlRepository.find({
      where: { user: { id: user.id } },
    });
  }

  async update({
    id,
    req,
    updateShortenedUrlDto,
  }: {
    id: number;
    req: Request;
    updateShortenedUrlDto: UpdateShortenedUrlDto;
  }) {
    const { originalUrl } = updateShortenedUrlDto;
    const { user } = req;

    if (!originalUrl) {
      throw new BadRequestException('A URL é obrigatória');
    }

    const existingUrl = await this.shortenedUrlRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!existingUrl || existingUrl.user?.id !== user.id) {
      throw new BadRequestException('URL não encontrada');
    }

    if (existingUrl?.user) {
      delete (existingUrl.user as any).password;
    }

    const newShortenedUrl = this.shortenedUrlRepository.create({
      original_url: updateShortenedUrlDto.originalUrl,
    });

    const updated = this.shortenedUrlRepository.merge(existingUrl, {
      original_url: newShortenedUrl.original_url,
    });

    return this.shortenedUrlRepository.save(updated);
  }

  remove(id: number) {
    return this.shortenedUrlRepository.delete(id);
  }
}
