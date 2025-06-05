import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ShortenedUrlService } from './shortened-url.service';
import { CreateShortenedUrlDto } from './dto/create-shortened-url.dto';
import { UpdateShortenedUrlDto } from './dto/update-shortened-url.dto';

@Controller('shortened-url')
export class ShortenedUrlController {
  constructor(private readonly shortenedUrlService: ShortenedUrlService) {}

  @Post()
  create(@Body() createShortenedUrlDto: CreateShortenedUrlDto) {
    return this.shortenedUrlService.create(createShortenedUrlDto);
  }

  @Get()
  findAll() {
    return this.shortenedUrlService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shortenedUrlService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateShortenedUrlDto: UpdateShortenedUrlDto) {
    return this.shortenedUrlService.update(+id, updateShortenedUrlDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shortenedUrlService.remove(+id);
  }
}
