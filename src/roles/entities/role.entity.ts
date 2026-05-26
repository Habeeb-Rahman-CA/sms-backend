import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ length: 50, unique: true })
  name: string;
}
