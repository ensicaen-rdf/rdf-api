import { Person } from '../../database/entities/person.model';

export class PersonDto {
  public idPerson: string;
  public name: string;
  public familyName: string;
  public birthDate: Date;
  public birthPlace: string;
  
  constructor(person: Person) {
    this.idPerson = person.idPerson;
    this.name = person.name;
    this.familyName = person.familyName;
    this.birthDate = person.birthDate;
    this.birthPlace = person.birthPlace;
  }
}
