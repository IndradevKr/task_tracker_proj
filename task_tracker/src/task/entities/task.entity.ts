import { IsOptional } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export type StatusType = 'todo' | 'completed';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'varchar', length: 10 })
  status: StatusType;

  @IsOptional()
  @CreateDateColumn()
  createdAt: Date;

  @IsOptional()
  @UpdateDateColumn()
  updatedAt: Date;
}
