import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Camera {
  @PrimaryGeneratedColumn('uuid')
  public idCamera: string;
}
