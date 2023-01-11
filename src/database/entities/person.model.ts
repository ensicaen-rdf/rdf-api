import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { PersonCsse } from './person-csse.model';
import { PersonStats } from './person-stats.model';
import { User } from './user.model';

@Entity()
export class Person {
  @PrimaryGeneratedColumn('uuid')
  public idPerson: string;

  @Column('uuid', { nullable: true })
  public idUser: string | null;
  @OneToOne(() => User, (user) => user.idUser)
  public user: User;

  @OneToMany(() => PersonCsse, (personCsse) => personCsse.person)
  public personCsse: PersonCsse[];

  @OneToMany(() => PersonStats, (personStats) => personStats.person)
  public personStats: PersonStats[];
  
  @Column()
  public birthPlace: string;
  
  @Column()
  public birthDate: Date;
  
  @Column()
  public familyName: string;
  
  @Column()
  public name: string;
}
