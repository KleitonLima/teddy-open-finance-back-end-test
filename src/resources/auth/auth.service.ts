import { ConflictException, Injectable } from '@nestjs/common';
import { AuthLoginDto } from './dto/auth-login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async login(authLoginDto: AuthLoginDto): Promise<{ token: string }> {
    const { email, password } = authLoginDto;

    if (!email || !password) {
      throw new ConflictException('Email ou password inválidos!');
    }

    const userLogged = await this.usersRepository.findOne({
      where: { email },
    });

    if (!userLogged) {
      throw new ConflictException('Email ou password inválidos!');
    }

    const isPasswordValid = await bcrypt.compare(password, userLogged.password);

    if (!isPasswordValid) {
      throw new ConflictException('Email ou password inválidos!');
    }

    const payload = { sub: userLogged.id, email: userLogged.email };
    const token = await this.jwtService.signAsync(payload);

    return { token };
  }
}
