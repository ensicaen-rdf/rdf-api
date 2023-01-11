export class CreateReportDto {
  idReport: number;
  idPersonFrom: number;
  idPersonTarget: number;
  reason: string;
  isValid?: boolean = false;
  nbPoints: number;
}
