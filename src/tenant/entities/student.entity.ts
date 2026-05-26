import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { School } from '../../schools/entities/school.entity';
import { User } from '../../users/entities/user.entity';
import { Class } from './class.entity';
import { Section } from './section.entity';
import { Gender } from '../../shared/entities/gender.entity';

@Entity('students')
export class Student {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'school_id' })
  schoolId: number;

  @ManyToOne(() => School, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'school_id' })
  school: School;

  @Column({ name: 'user_id', nullable: true })
  userId: number;

  @ManyToOne(() => User, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'class_id' })
  classId: number;

  @ManyToOne(() => Class, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'class_id' })
  class: Class;

  @Column({ name: 'section_id' })
  sectionId: number;

  @ManyToOne(() => Section, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'section_id' })
  section: Section;

  @Column({ name: 'admission_number', length: 50 })
  admissionNumber: string;

  @Column({ name: 'roll_number', length: 50, nullable: true })
  rollNumber: string;

  @Column({ name: 'date_of_birth', type: 'date', nullable: true })
  dateOfBirth: Date;

  @Column({ name: 'gender_id', nullable: true })
  genderId: number;

  @ManyToOne(() => Gender, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'gender_id' })
  gender: Gender;
}
