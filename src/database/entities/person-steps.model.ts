import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Person } from './person.model';

@Entity()
export class PersonSteps {
  @PrimaryGeneratedColumn('uuid')
  public idSteps: string;

  @Column('uuid')
  public idPerson: string;
  @ManyToOne(() => Person, (person) => person.idPerson)
  @JoinColumn({ name: 'idPerson' })
  public person: Person;

  @Column()
  public date: Date;

  @Column()
  public amount: number;
}
