import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Person } from './person.model';

@Entity()
export class PersonLocalisation {
  @PrimaryGeneratedColumn('uuid')
  public idLocalisation: string;

  @Column('uuid')
  public idPerson: string;
  @ManyToOne(() => Person, (person) => person.idPerson)
  @JoinColumn({ name: 'idPerson' })
  public person: Person;

  @Column('datetime')
  public date: Date;

  @Column()
  public latitude: number;

  @Column()
  public longitude: number;

  @Column()
  public address: string;
}
