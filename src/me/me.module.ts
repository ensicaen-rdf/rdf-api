import { Module } from '@nestjs/common';

import { PersonModule } from '../person/person.module';
import { MeController } from './me.controller';

@Module({
  imports: [PersonModule],
  controllers: [MeController],
})
export class MeModule {}
