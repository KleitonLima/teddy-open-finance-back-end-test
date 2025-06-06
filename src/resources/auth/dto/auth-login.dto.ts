import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class AuthLoginDto {
  @ApiProperty({
    description: 'Email do usuário para login',
    example: 'user@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Senha do usuário para login',
    example: 'password123',
  })
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
