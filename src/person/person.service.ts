import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Person } from 'src/database/entities/person.model';
import { User } from 'src/database/entities/user.model';
import { UserDto } from 'src/users/dto/user.dto';
import { Repository } from 'typeorm';
import { PersonDto } from './dto/person.dto';

@Injectable()
export class PersonService {

  constructor(
    @InjectRepository(Person) private readonly _personRepository: Repository<Person>,
    @InjectRepository(User) private readonly _userRepository: Repository<User>,
  ) {}


  public async create(
    nationalId: string,
    lastName: string,
    firstNames: string,
    dateOfBirth: Date,
    placeOfBirth: string,
    address: string,
    city: string,
    country: string,
    eyesColour: string,
    height: number,
    weight: number,
    photo: string,
    iris: string,
    fingerprints: string,
    socialSecurityNumber: string,
    pathologies: string,
    bloodType: string,
    bloodRhesus: string,
    placeOfWork: string,
    companyName: string
    ): Promise<Person>{
    const person = new Person();
    person.nationalId = nationalId;
    person.lastName = lastName;
    person.firstNames = firstNames;
    person.dateOfBirth = dateOfBirth;
    person.placeOfBirth = placeOfBirth;
    person.address = address;
    person.city = city;
    person.country = country;
    person.eyesColour = eyesColour;
    person.height = height;
    person.weight = weight;
    person.photo = photo;
    person.iris = iris;
    person.fingerprints = fingerprints;
    person.socialSecurityNumber = socialSecurityNumber;
    person.pathologies = pathologies;
    person.bloodType = bloodType;
    person.bloodRhesus = bloodRhesus;
    person.placeOfWork = placeOfWork;
    person.companyName = companyName;

    return this._personRepository.save(person);
  }

  public async mergeUser(idPerson: string, idUser: string): Promise<UserDto> {
    const person = await this._personRepository.findOneBy({idPerson: idPerson});
    const user = await this._userRepository.findOneBy({idUser: idUser});
    
    user.person = person;
    
    return this._userRepository.save(user);
  }

  public async getAll(): Promise<PersonDto[]> {
    const persons = await this._personRepository.find();
    return persons;
  }

}
