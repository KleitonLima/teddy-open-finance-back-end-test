import { IsString, IsUrl, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateShortenedUrlDto {
  @ApiProperty({ example: 'https://www.exemplo.com/exemplo' })
  @IsString()
  @IsUrl()
  originalUrl: string;

  @ApiPropertyOptional({
    example: '4d1db414-be1a-4237-a0ea-d888d0f81a5b',
    description: 'ID do usuário dono da URL',
  })
  @IsOptional()
  user?: string;
}
