import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePersonDto {
  @ApiPropertyOptional()
  idUser: string;

  @ApiProperty()
  public lastName: string;

  @ApiProperty()
  public firstNames: string;

  @ApiProperty()
  public dateOfBirth: string;

  @ApiProperty()
  public placeOfBirth: string;

  @ApiProperty()
  public nationalId: string;

  @ApiProperty()
  public address: string;

  @ApiProperty()
  public city: string;

  @ApiProperty()
  public country: string;

  @ApiProperty()
  public eyesColour: string;

  @ApiProperty()
  public height: number; //cm

  @ApiProperty()
  public weight: number; //kg

  @ApiProperty()
  public photo: string;

  @ApiProperty()
  public iris: string;

  @ApiProperty()
  public fingerprints: string;

  @ApiProperty()
  public socialSecurityNumber: string;

  @ApiProperty()
  public pathologies: string;

  @ApiProperty()
  public bloodType: string;

  @ApiProperty()
  public bloodRhesus: string;

  @ApiProperty()
  public placeOfWork: string;

  @ApiProperty()
  public companyName: string;
}
