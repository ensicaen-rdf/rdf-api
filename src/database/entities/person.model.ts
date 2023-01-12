import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { PersonCsse } from './person-csse.model';
import { PersonLocalisation } from './person-localisation.model';
import { PersonStats } from './person-stats.model';

@Entity()
export class Person {
  @PrimaryGeneratedColumn('uuid')
  public idPerson: string;

  @OneToMany(() => PersonCsse, (personCsse) => personCsse.person)
  public personCsse: PersonCsse[];

  @OneToMany(() => PersonStats, (personStats) => personStats.person)
  public personStats: PersonStats[];

  @Column()
  public lastName: string;

  @Column()
  public firstNames: string;

  @Column()
  public dateOfBirth: Date;
  @OneToMany(() => PersonLocalisation, (personLocalisation) => personLocalisation.person)
  public personLocalisations: PersonLocalisation[];

  @Column()
  public birthPlace: string;

  @Column()
  public birthDate: Date;

  @Column()
  public familyName: string;

  @Column()
  public placeOfBirth: string;

  @Column()
  public nationalId: string;

  @Column()
  public address: string;

  @Column()
  public city: string;

  @Column()
  public country: string;

  @Column()
  public eyesColour: string;

  @Column()
  public height: number; //cm

  @Column()
  public weight: number; //kg

  @Column()
  public photo: string;

  @Column()
  public iris: string;

  @Column()
  public fingerprints: string;

  @Column()
  public socialSecurityNumber: string;

  @Column()
  public pathologies: string;

  @Column()
  public bloodType: string;

  @Column()
  public bloodRhesus: string;

  @Column()
  public placeOfWork: string;

  @Column()
  public companyName: string;
}
