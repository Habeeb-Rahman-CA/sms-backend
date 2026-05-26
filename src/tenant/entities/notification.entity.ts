import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { School } from '../../schools/entities/school.entity';

@Entity('notifications')
export class Notification {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'school_id' })
  schoolId: number;

  @ManyToOne(() => School, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'school_id' })
  school: School;

  @Column({ length: 150 })
  title: string;

  @Column({ type: 'text' })
  content: string;

  @CreateDateColumn({ name: 'sent_at', type: 'timestamp' })
  sentAt: Date;
}
