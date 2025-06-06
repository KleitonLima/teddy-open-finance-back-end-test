import { Module } from '@nestjs/common';
import { ShortenedUrlService } from './shortened-url.service';
import { ShortenedUrlController } from './shortened-url.controller';

@Module({
  controllers: [ShortenedUrlController],
  providers: [ShortenedUrlService],
})
export class ShortenedUrlModule {}
