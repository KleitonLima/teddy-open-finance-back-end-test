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
  IsBoolean,
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
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  @IsUrl()
  original_url: string;

  @Column()
  @IsString()
  shortened_url: string;

  @Column({ default: 0 })
  @IsInt()
  @Min(0)
  accesses: number;

  @Column({ default: false })
  @IsBoolean()
  deleted: boolean;

  @CreateDateColumn()
  @IsDate()
  created_at: Date;

  @UpdateDateColumn()
  @IsDate()
  updated_at: Date;

  @DeleteDateColumn({ nullable: true })
  @IsOptional()
  @IsDate()
  deleted_at?: Date | null;

  @ManyToOne(() => User, (user) => user.shortened_urls, { nullable: false })
  user: User;
}
