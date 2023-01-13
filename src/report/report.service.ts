import { PersonCsse } from 'src/database/entities/person-csse.model';
import { Person } from 'src/database/entities/person.model';
import { Report } from 'src/database/entities/report.model';
import { User } from 'src/database/entities/user.model';
import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ReportDto } from './dto/report.dto';

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(User) private readonly _userRepository: Repository<User>,
    @InjectRepository(Report) private readonly _reportRepository: Repository<Report>,
    @InjectRepository(Person) private readonly _personRepository: Repository<Person>,
    @InjectRepository(PersonCsse) private readonly _csseRepository: Repository<PersonCsse>,
  ) {}

  public async create(fromIdUser: string, to: string, reason: string) {
    const user = await this._userRepository.findOneBy({ idUser: fromIdUser });

    const rep = new Report();
    rep.idPersonFrom = user.idUser;
    rep.idPersonTarget = to;
    rep.reason = reason;
    rep.isValid = false;
    rep.isTreated = false;
    rep.nbPoints = 0;
    return this._reportRepository.save(rep);
  }

  public async validate(idReport: string, isValid: boolean, nbPoints: number) {
    const report = await this._reportRepository.findOneBy({ idReport: idReport });
    report.isValid = isValid;
    report.nbPoints = nbPoints;

    if (isValid) {
      const loose = new PersonCsse();
      loose.idPerson = report.idPersonTarget;
      loose.amount = -report.nbPoints;

      const win = new PersonCsse();
      win.idPerson = report.idPersonFrom;
      win.amount = 5;

      await this._csseRepository.save(loose);
      await this._csseRepository.save(win);
    }

    report.isTreated = true;
    await this._reportRepository.save(report);
  }

  public async findReportFrom(id: string): Promise<Report[]> {
    const rep = await this._reportRepository.findBy({
      idPersonFrom: id,
    });
    return rep;
  }

  public async findReportConcerning(id: string): Promise<Report[]> {
    const rep = await this._reportRepository.findBy({
      idPersonTarget: id,
    });
    return rep;
  }

  public async getAll(): Promise<Report[]> {
    const rep = await this._reportRepository.find();
    return rep;
  }

  public async getReportUntreated(): Promise<ReportDto[]> {
    const rep = await this._reportRepository.findBy({
      isTreated: false,
    });
    return rep;
  }
}
