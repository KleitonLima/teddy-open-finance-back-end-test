import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';
import {
  IsEmail,
  IsNotEmpty,
  MinLength,
  IsDate,
  IsOptional,
} from 'class-validator';
import { ShortenedUrl } from '../../shortened-url/entities/shortened-url.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Column()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn({ nullable: true })
  @IsDate()
  @IsOptional()
  deleted_at: Date | null;

  @OneToMany(() => ShortenedUrl, (shortenedUrl) => shortenedUrl.user)
  shortened_urls: ShortenedUrl[];
}
