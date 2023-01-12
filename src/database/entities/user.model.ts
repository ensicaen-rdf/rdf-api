import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Person } from './person.model';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  public idUser: string;

  @Column('uuid', { nullable: true })
  public idPerson?: string | null;
  @OneToOne(() => Person, (person) => person.idPerson, { cascade: true })
  @JoinColumn({ name: 'idPerson' })
  public person?: Person;

  @Column()
  public username: string;

  @Column()
  public password: string;
}
