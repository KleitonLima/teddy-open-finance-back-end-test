import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import bcrypt from 'bcrypt';
import { ENVCONFIG } from 'src/config/env.config';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;

    const hashPassword = await bcrypt.hash(password, ENVCONFIG.PASS_SALT);

    const user = this.usersRepository.create({
      email,
      password: hashPassword,
    });

    return this.usersRepository.save(user);
  }

  findOne(id: string) {
    return this.usersRepository.findOne({ where: { id } });
  }
}
