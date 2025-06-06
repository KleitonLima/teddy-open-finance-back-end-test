import { PartialType } from '@nestjs/swagger';
import { CreateShortenedUrlDto } from './create-shortened-url.dto';

export class UpdateShortenedUrlDto extends PartialType(CreateShortenedUrlDto) {}
