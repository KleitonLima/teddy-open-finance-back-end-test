import { Injectable } from '@nestjs/common';
import { CreateShortenedUrlDto } from './dto/create-shortened-url.dto';
import { UpdateShortenedUrlDto } from './dto/update-shortened-url.dto';

@Injectable()
export class ShortenedUrlService {
  create(createShortenedUrlDto: CreateShortenedUrlDto) {
    return 'This action adds a new shortenedUrl';
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
