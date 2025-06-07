import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from '../users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from 'src/database/config/typeorm.db';
import { AuthModule } from '../auth/auth.module';
import { ShortenedUrlModule } from '../shortened-url/shortened-url.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    ShortenedUrlModule,
    TypeOrmModule.forRoot(AppDataSource.options),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
