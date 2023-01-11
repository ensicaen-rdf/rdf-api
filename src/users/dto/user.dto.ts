import { User } from '../../database/entities/user.model';

export class UserDto {
  public idUser: string;
  public idPerson?: string | null;
  public username: string;

  constructor(user: User) {
    this.idUser = user.idUser;
    this.idPerson = user.idPerson;
    this.username = user.username;
  }
}
