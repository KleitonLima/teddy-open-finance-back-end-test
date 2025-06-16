import { BadRequestException, Injectable } from '@nestjs/common';
import { ENVCONFIG } from 'src/config/env.config';
import { Repository } from 'typeorm';
import { ShortenedUrl } from './shortened-url/entities/shortened-url.entity';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class AppService {
  constructor(
    @InjectRepository(ShortenedUrl)
    private readonly shortenedUrlRepository: Repository<ShortenedUrl>,
  ) {}

  getAppStatus(): string {
    return `Server is running! 🚀\n Please check <a href="http://localhost:${ENVCONFIG.PORT}/api/v0/docs">http://localhost:${ENVCONFIG.PORT}/api/v0/docs</a> for Swagger docs...`;
  }

  async accessShortenedUrl(res, shortUrl: string) {
    if (!shortUrl) {
      throw new BadRequestException('URL encurtada inválida');
    }

    const completeShortUrl = `${ENVCONFIG.BACKEND_URL}/${shortUrl}`;

    const shortenedUrl = await this.shortenedUrlRepository.findOne({
      where: { short_url: completeShortUrl },
    });

    if (!shortenedUrl) {
      throw new BadRequestException('URL não encontrada');
    }

    shortenedUrl.accesses = (shortenedUrl.accesses || 0) + 1;
    await this.shortenedUrlRepository.save(shortenedUrl);

    return res.redirect(shortenedUrl.original_url);
  }
}
