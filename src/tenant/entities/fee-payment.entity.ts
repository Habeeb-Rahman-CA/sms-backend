import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { School } from '../../schools/entities/school.entity';
import { Fee } from './fee.entity';
import { Student } from './student.entity';

@Entity('fee_payments')
export class FeePayment {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'school_id' })
  schoolId: number;

  @ManyToOne(() => School, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'school_id' })
  school: School;

  @Column({ name: 'fee_id' })
  feeId: number;

  @ManyToOne(() => Fee, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'fee_id' })
  fee: Fee;

  @Column({ name: 'student_id' })
  studentId: number;

  @ManyToOne(() => Student, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'student_id' })
  student: Student;

  @Column({ name: 'amount_paid', type: 'decimal', precision: 10, scale: 2 })
  amountPaid: number;

  @Column({ name: 'payment_date', type: 'date' })
  paymentDate: Date;

  @Column({ name: 'payment_method', length: 50, nullable: true })
  paymentMethod: string; // e.g. Cash, Card, Online
}
