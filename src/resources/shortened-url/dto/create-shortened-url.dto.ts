import { IsString, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateShortenedUrlDto {
  @ApiProperty({ example: 'https://www.exemplo.com/exemplo' })
  @IsString()
  @IsUrl()
  originalUrl: string;
}
