import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Person } from './person.model';

@Entity()
export class PersonCsse {
  @PrimaryGeneratedColumn('uuid')
  public idCsse: string;

  @Column('uuid')
  public idPerson: string;
  @ManyToOne(() => Person, (person) => person.idPerson)
  @JoinColumn({ name: 'idPerson' })
  public person: Person;

  @Column()
  public amount: number;
}
