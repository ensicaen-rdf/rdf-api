import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Report {
  @PrimaryGeneratedColumn('uuid')
  public idReport: string;

  @Column()
  public idPersonFrom: string;

  @Column()
  public idPersonTarget: string;

  @Column()
  public reason: string;

  @Column()
  public isValid: boolean;

  @Column()
  public isTreated: boolean;
  
  @Column()
  public nbPoints: number;
  
}
