export interface Report {
  @
  idPersonFrom: number;
  idPersonTarget: number;
  reason: string;
  isValid?: boolean;
  nbPoints: number;
}