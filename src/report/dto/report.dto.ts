import { Report } from '../../database/entities/report.model';

export class ReportDto {
  public idReport: string;
  public idPersonFrom: string;
  public idPersonTarget: string;
  public reason: string;
  public isValid?: boolean = false;
  public isTreated?: boolean = false;
  public nbPoints: number;

  constructor(report: Report) {
    this.idReport = report.idReport;
    this.idPersonFrom = report.idPersonFrom;
    this.idPersonTarget = report.idPersonTarget;
    this.reason = report.reason;
    this.isValid = report.isValid;
    this.isTreated = report.isTreated;
    this.nbPoints = report.nbPoints;
  }
}
