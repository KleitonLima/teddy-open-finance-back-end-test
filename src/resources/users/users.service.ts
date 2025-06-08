import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { ENVCONFIG } from 'src/config/env.config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;

    const existingUser = await this.usersRepository.findOne({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException('Usuário já cadastrado! Tente fazer login.');
    }

    const hashPassword = await bcrypt.hash(
      password,
      Number(ENVCONFIG.PASS_SALT),
    );

    const newUser = this.usersRepository.create({
      email,
      password: hashPassword,
    });

    const user = await this.usersRepository.save(newUser);
    user.password = '';

    return user;
  }
}
