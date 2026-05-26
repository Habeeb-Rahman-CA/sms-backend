import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('genders')
export class Gender {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ length: 50, unique: true })
  name: string;

  @Column({ length: 10, unique: true, nullable: true })
  code: string;
}
