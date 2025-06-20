import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
} from 'typeorm';
import {
  IsDate,
  IsInt,
  IsOptional,
  IsString,
  IsUrl,
  Min,
} from 'class-validator';
import { User } from '../../users/entities/user.entity';

@Entity('shortened_url')
export class ShortenedUrl {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsString()
  @IsUrl()
  original_url: string;

  @Column()
  @IsString()
  short_url: string;

  @Column({ default: 0 })
  @IsOptional()
  @IsInt()
  @Min(0)
  accesses: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn({ nullable: true })
  @IsOptional()
  @IsDate()
  deleted_at?: Date | null;

  @ManyToOne(() => User, (user) => user.shortened_urls, { nullable: true })
  @IsOptional()
  user?: User;
}
