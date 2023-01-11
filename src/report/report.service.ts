import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from 'src/database/entities/report.model';

@Injectable()
export class ReportService {

    @InjectRepository(Report) private readonly _reportRepository: Repository<Report>
    
    async create(from: number, to: number, reason: string) {
        const rep = new Report();
        rep.idPersonFrom = from;
        rep.idPersonTarget = to;
        rep.reason = reason;
        rep.isValid = false;
        rep.nbPoints = 0;
        return this._reportRepository.save(rep);
    }

    findByFrom(id: number) {

    }

    findByTo(id: number) {

    }

    getAll() {

    }

}
