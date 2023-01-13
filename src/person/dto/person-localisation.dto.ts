import { ApiProperty } from '@nestjs/swagger';

import { PersonLocalisation } from '../../database/entities/person-localisation.model';

export class PersonLocalisationDto {
  @ApiProperty()
  idPerson: string;

  @ApiProperty()
  latitude: number;

  @ApiProperty()
  longitude: number;

  constructor(personLocalisation: PersonLocalisation) {
    this.idPerson = personLocalisation.idPerson;
    this.latitude = personLocalisation.latitude;
    this.longitude = personLocalisation.longitude;
  }
}

export class SetPersonLocalisationDto {
  @ApiProperty()
  latitude: number;

  @ApiProperty()
  longitude: number;
}
