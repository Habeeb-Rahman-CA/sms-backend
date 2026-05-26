import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Country } from './country.entity';

@Entity('states')
export class State {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 10, nullable: true })
  code: string;

  @Column({ name: 'country_id' })
  countryId: number;

  @ManyToOne(() => Country, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'country_id' })
  country: Country;
}
