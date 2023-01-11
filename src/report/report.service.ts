import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from 'src/database/entities/report.model';
import { PersonCsse } from 'src/database/entities/person-csse.model';
import { Person } from 'src/database/entities/person.model';
import { ReportDto } from './dto/report.dto';

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(Report) private readonly _reportRepository: Repository<Report>,
    @InjectRepository(Person) private readonly _personRepository: Repository<Person>,
    @InjectRepository(PersonCsse) private readonly _csseRepository: Repository<PersonCsse>,
  ) {}

  public async create(from: string, to: string, reason: string) {
    const rep = new Report();
    rep.idPersonFrom = from;
    rep.idPersonTarget = to;
    rep.reason = reason;
    rep.isValid = false;
    rep.nbPoints = 0;
    return this._reportRepository.save(rep);
  }

  public async validate(idReport: string, isValid: boolean, nbPoints: number) {
    const rep = await this._reportRepository.findOneBy({ idReport: idReport });
    rep.isValid = isValid;
    rep.nbPoints = nbPoints;

    if (isValid) {
      const idCSSE = await this._csseRepository.findOneBy({ idPerson: rep.idPersonTarget });
      const transaction = new PersonCsse();

      transaction.amount -= rep.nbPoints;
    }

    rep.isTreated = true;
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
      isTreated: false
    })
    return rep;
  }
}
