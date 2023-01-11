import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Person } from './person.model';

@Entity()
export class PersonStats {
  @PrimaryGeneratedColumn('uuid')
  public idStat: string;

  @Column('uuid')
  public idPerson: string;
  @ManyToOne(() => Person, (person) => person.idPerson)
  public person: Person;

  @Column()
  public label: string;

  @Column()
  public amount: number;
}
