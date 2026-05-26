import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { School } from '../../schools/entities/school.entity';
import { User } from '../../users/entities/user.entity';
import { Designation } from './designation.entity';

@Entity('employees')
export class Employee {
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

  @Column({ name: 'employee_code', length: 50, nullable: true })
  employeeCode: string;

  @Column({ name: 'designation_id', nullable: true })
  designationId: number;

  @ManyToOne(() => Designation, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'designation_id' })
  designation: Designation;

  @Column({ length: 20, nullable: true })
  phone: string;
}
