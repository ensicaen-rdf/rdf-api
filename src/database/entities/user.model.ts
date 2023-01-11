import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Person } from './person.model';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  public idUser: string;

  @Column('uuid', { nullable: true })
  public idPerson?: string | null;
  @OneToOne(() => Person, (person) => person.idPerson)
  public person?: Person;
}
