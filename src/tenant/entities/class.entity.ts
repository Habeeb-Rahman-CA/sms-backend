import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { School } from '../../schools/entities/school.entity';

@Entity('classes')
export class Class {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'school_id' })
  schoolId: number;

  @ManyToOne(() => School, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'school_id' })
  school: School;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 20, nullable: true })
  code: string;
}
