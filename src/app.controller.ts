import { Controller, Get, Param, Res, Response } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getStatus(): string {
    return this.appService.getAppStatus();
  }

  @Get(':shortUrl')
  accessShortenedUrl(
    @Param('shortUrl') shortUrl: string,
    @Res() res: Response,
  ) {
    return this.appService.accessShortenedUrl(res, shortUrl);
  }
}
