import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getStatus(): string {
    return this.appService.getAppStatus();
  }

  @Get(':shortUrl')
  accessShortenedUrl(@Param('shortUrl') shortUrl: string) {
    return this.appService.accessShortenedUrl(shortUrl);
  }
}
