import { Module } from '@nestjs/common';
import { ShortenedUrlService } from './shortened-url.service';
import { ShortenedUrlController } from './shortened-url.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShortenedUrl } from './entities/shortened-url.entity';
import { RandomCodeUtil } from 'src/utils/random-code.util';

@Module({
  imports: [TypeOrmModule.forFeature([ShortenedUrl])],
  controllers: [ShortenedUrlController],
  providers: [ShortenedUrlService, RandomCodeUtil],
})
export class ShortenedUrlModule {}
