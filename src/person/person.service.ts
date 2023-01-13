import { Person } from 'src/database/entities/person.model';
import { User } from 'src/database/entities/user.model';
import { UserDto } from 'src/users/dto/user.dto';
import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { PersonCsse } from '../database/entities/person-csse.model';
import { PersonLocalisation } from '../database/entities/person-localisation.model';
import { PersonSteps } from '../database/entities/person-steps.model';

const STEPS_FOR_A_POINT = 100;

@Injectable()
export class PersonService {
  constructor(
    @InjectRepository(Person) private readonly _personRepository: Repository<Person>,
    @InjectRepository(User) private readonly _userRepository: Repository<User>,
    @InjectRepository(PersonLocalisation) private readonly _personLocalisationRepository: Repository<PersonLocalisation>,
    @InjectRepository(PersonCsse) private readonly _personCsseRepository: Repository<PersonCsse>,
    @InjectRepository(PersonSteps) private readonly _personStepsRepository: Repository<PersonSteps>,
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
    companyName: string,
  ): Promise<Person> {
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
    const person = await this._personRepository.findOneBy({ idPerson: idPerson });
    const user = await this._userRepository.findOneBy({ idUser: idUser });

    user.person = person;

    return this._userRepository.save(user);
  }

  public async getAll(): Promise<Person[]> {
    const persons = await this._personRepository.find();
    return persons;
  }

  public async getPerson(idPerson: string): Promise<Person> {
    return await this._personRepository.findOneBy({ idPerson: idPerson });
  }

  public async setLocalisation(idPerson: string, lat: number, lon: number) {
    const localisation = new PersonLocalisation();
    localisation.idPerson = idPerson;
    localisation.date = new Date();
    localisation.latitude = lat;
    localisation.longitude = lon;
    await this._personLocalisationRepository.save(localisation);
  }

  public async getLocalisation(idPerson: string): Promise<PersonLocalisation> {
    return await this._personLocalisationRepository.findOne({ where: { idPerson }, order: { date: 'DESC' } });
  }

  public async addSteps(idPerson: string, numberOfSteps: number): Promise<void> {
    const previousTotalSteps = await this.getSteps(idPerson);
    const lastSteps = await this._personStepsRepository.findOne({ where: { idPerson }, order: { date: 'DESC' } });

    let amount = numberOfSteps;
    if (lastSteps) {
      if (lastSteps.amount < amount) {
        amount = amount - lastSteps.amount;
      } else if (lastSteps.amount === amount) {
        return;
      }
    }

    const steps = new PersonSteps();
    steps.idPerson = idPerson;
    steps.date = new Date();
    steps.amount = amount;

    await this._personStepsRepository.save(steps);

    const totalSteps = await this.getSteps(idPerson);

    const earnedPoints = Math.floor(totalSteps / STEPS_FOR_A_POINT) - Math.floor(previousTotalSteps / STEPS_FOR_A_POINT);
    if (earnedPoints > 0) {
      this.addCsse(idPerson, earnedPoints);
    }
  }

  public async getSteps(idPerson: string): Promise<number> {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const end = new Date();
    end.setHours(23, 59, 59, 999);

    const queryBuilder = this._personStepsRepository.createQueryBuilder('steps');
    const res = await queryBuilder
      .where('steps.idPerson = :idPerson', { idPerson: idPerson })
      .andWhere('steps.date BETWEEN :start AND :end', { start: start, end: end })
      .select('SUM(steps.amount)', 'amount')
      .groupBy('steps.idPerson')
      .getRawOne<{ amount: string }>();

    return !res ? 0 : Number(res.amount);
  }

  public async getCsse(idPerson: string): Promise<number> {
    const start = new Date();
    start.setDate(1);
    start.setHours(0, 0, 0, 0);
    const end = new Date();
    end.setMonth(end.getMonth() + 1);
    end.setDate(0);
    end.setHours(23, 59, 59, 999);

    const queryBuilder = this._personCsseRepository.createQueryBuilder('csse');
    const res = await queryBuilder
      .where('csse.idPerson = :idPerson', { idPerson: idPerson })
      .andWhere('csse.date BETWEEN :start AND :end', { start: start, end: end })
      .select('SUM(csse.amount)', 'amount')
      .groupBy('csse.idPerson')
      .getRawOne<{ amount: string }>();

    return !res ? 0 : Number(res.amount);
  }

  public async addCsse(idPerson: string, amount: number): Promise<void> {
    const csse = new PersonCsse();
    csse.idPerson = idPerson;
    csse.date = new Date();
    csse.amount = amount;

    await this._personCsseRepository.save(csse);
  }
}
