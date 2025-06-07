import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ShortenedUrlService } from './shortened-url.service';
import { CreateShortenedUrlDto } from './dto/create-shortened-url.dto';
import { UpdateShortenedUrlDto } from './dto/update-shortened-url.dto';
import { Request } from 'express';
import { ApiBearerAuth } from '@nestjs/swagger';
import { OptionalAuthGuard } from '../auth/optional-auth.guard';
import { AuthGuard } from '../auth/auth.guard';

@Controller('shortened-url')
@ApiBearerAuth()
export class ShortenedUrlController {
  constructor(private readonly shortenedUrlService: ShortenedUrlService) {}

  @UseGuards(OptionalAuthGuard)
  @Post()
  create(
    @Body() createShortenedUrlDto: CreateShortenedUrlDto,
    @Req() req: Request,
  ) {
    return this.shortenedUrlService.create(createShortenedUrlDto, req);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll(@Req() req: Request) {
    return this.shortenedUrlService.findAll(req);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shortenedUrlService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateShortenedUrlDto: UpdateShortenedUrlDto,
  ) {
    return this.shortenedUrlService.update(+id, updateShortenedUrlDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shortenedUrlService.remove(+id);
  }
}
