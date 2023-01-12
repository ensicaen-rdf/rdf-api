import { readFile } from 'fs/promises';
import { join } from 'path';
import { DataSource } from 'typeorm';

import { Injectable } from '@nestjs/common';

import { Person } from './entities/person.model';

@Injectable()
export class DatabasePopulateService {
  private _data = [{ file: 'people.json', type: Person, uniqueKey: 'nationalId' }];

  constructor(private _dataSource: DataSource) {}

  public async populate() {
    for (const { file, type, uniqueKey } of this._data) {
      const data = JSON.parse((await readFile(join(__dirname, '..', '..', 'data', file))).toString());
      for (const item of data) {
        const itemExists = await this._dataSource.manager.findOne(type, { where: { [uniqueKey]: item[uniqueKey] } });
        if (!itemExists) {
          await this._dataSource.manager.save(type, item);
        }
      }
    }
  }
}
