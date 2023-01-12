import { hash } from 'bcrypt';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { DataSource } from 'typeorm';

import { Injectable } from '@nestjs/common';

import { Person } from './entities/person.model';
import { User } from './entities/user.model';

@Injectable()
export class DatabasePopulateService {
  private _data = [{ file: 'people.json', type: Person, uniqueKey: 'nationalId' }];

  constructor(private _dataSource: DataSource) {}

  public async populate() {
    // const entities = this._dataSource.entityMetadatas;
    // const tableNames = entities.map((entity) => `"${entity.tableName}"`).join(', ');
    // await this._dataSource.query(`TRUNCATE ${tableNames} CASCADE;`);

    for (const { file, type, uniqueKey } of this._data) {
      const data = JSON.parse((await readFile(join(__dirname, '..', '..', 'data', file))).toString());
      for (const item of data) {
        const itemExists = await this._dataSource.manager.findOne(type, { where: { [uniqueKey]: item[uniqueKey] } });
        if (!itemExists) {
          switch (type) {
            case Person:
              const user = new User();
              user.username = item.nationalId;
              user.password = await hash(item.nationalId, 12);
              const person = new Person();
              Object.assign(person, item);
              user.person = person;
              await this._dataSource.manager.save(user);
              break;

            default:
              await this._dataSource.manager.save(type, item);
              break;
          }
        }
      }
    }
  }
}
