import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { School } from '../../schools/entities/school.entity';
import { Exam } from './exam.entity';
import { Student } from './student.entity';
import { Subject } from './subject.entity';

@Entity('exam_marks')
export class ExamMark {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'school_id' })
  schoolId: number;

  @ManyToOne(() => School, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'school_id' })
  school: School;

  @Column({ name: 'exam_id' })
  examId: number;

  @ManyToOne(() => Exam, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'exam_id' })
  exam: Exam;

  @Column({ name: 'student_id' })
  studentId: number;

  @ManyToOne(() => Student, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'student_id' })
  student: Student;

  @Column({ name: 'subject_id' })
  subjectId: number;

  @ManyToOne(() => Subject, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'subject_id' })
  subject: Subject;

  @Column({ name: 'marks_obtained', type: 'decimal', precision: 5, scale: 2 })
  marksObtained: number;

  @Column({ name: 'max_marks', type: 'decimal', precision: 5, scale: 2 })
  maxMarks: number;
}
