import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Report {
  @PrimaryGeneratedColumn('uuid')
  public idReport: string;

  @Column()
  public idPersonFrom: number;

  @Column()
  public idPersonTarget: number;

  @Column()
  public reason: string;

  @Column()
  public isValid: boolean;

  @Column()
  public nbPoints: number;
}
