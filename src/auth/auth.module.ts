import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { ENVCONFIG } from 'src/config/env.config';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: ENVCONFIG.JWT_SECRET,
      signOptions: { expiresIn: ENVCONFIG.JWT_EXPIRATION ?? '5m' },
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
