import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('countries')
export class Country {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ length: 100, unique: true })
  name: string;

  @Column({ length: 10, unique: true })
  code: string;

  @Column({ name: 'phone_code', length: 10, nullable: true })
  phoneCode: string;
}
