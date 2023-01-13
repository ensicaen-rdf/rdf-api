import { Person } from '../../database/entities/person.model';

export class PersonDto {
  public idPerson: string;

  public lastName: string;
  public firstNames: string;
  public dateOfBirth: Date;
  public placeOfBirth: string;
  public nationalId: string;
  public address: string;
  public city: string;
  public country: string;
  public eyesColour: string;
  public height: number; //cm
  public weight: number; //kg
  public photo: string;
  public iris: string;
  public fingerprints: string;
  public socialSecurityNumber: string;
  public pathologies: string;
  public bloodType: string;
  public bloodRhesus: string;
  public placeOfWork: string;
  public companyName: string;
  public csse: number;

  constructor(person: Person, csse: number) {
    this.idPerson = person.idPerson;
    this.nationalId = person.nationalId;
    this.lastName = person.lastName;
    this.firstNames = person.firstNames;
    this.dateOfBirth = person.dateOfBirth;
    this.placeOfBirth = person.placeOfBirth;
    this.address = person.address;
    this.city = person.city;
    this.country = person.country;
    this.eyesColour = person.eyesColour;
    this.height = person.height;
    this.weight = person.weight;
    this.photo = person.photo;
    this.iris = person.iris;
    this.fingerprints = person.fingerprints;
    this.socialSecurityNumber = person.socialSecurityNumber;
    this.pathologies = person.pathologies;
    this.bloodType = person.bloodType;
    this.bloodRhesus = person.bloodRhesus;
    this.placeOfWork = person.placeOfWork;
    this.companyName = person.companyName;
    this.csse = csse;
  }
}
