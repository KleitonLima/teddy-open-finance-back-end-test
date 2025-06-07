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

  findAll() {
    return `This action returns all shortenedUrl`;
  }

  findOne(id: number) {
    return `This action returns a #${id} shortenedUrl`;
  }

  update(id: number, updateShortenedUrlDto: UpdateShortenedUrlDto) {
    return `This action updates a #${id} shortenedUrl`;
  }

  remove(id: number) {
    return `This action removes a #${id} shortenedUrl`;
  }
}
