import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('schools')
export class School {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'school_name', length: 150 })
  schoolName: string;

  @Column({ name: 'school_code', length: 50, unique: true })
  schoolCode: string;

  @Column({ length: 100, unique: true, nullable: true })
  domain: string;

  @Column({ type: 'text', nullable: true })
  address: string;

  @Column({ length: 20, nullable: true })
  phone: string;

  @Column({ length: 100, unique: true })
  email: string;

  @Column({ type: 'text', nullable: true })
  logo: string;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
