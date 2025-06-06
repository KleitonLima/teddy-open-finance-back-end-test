import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from '../users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from 'src/database/config/typeorm.db';

@Module({
  imports: [UsersModule, TypeOrmModule.forRoot(AppDataSource.options)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
