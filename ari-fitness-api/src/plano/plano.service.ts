import { Injectable } from '@nestjs/common';
import { DataBaseService } from 'src/datasource/database.service';
import { Plano } from './plano.interface';

const tableName = 'planos';

@Injectable()
export class PlanoService {
  constructor(private database: DataBaseService) {}

  /**
   * The `findAll` function retrieves all records from a specified table in a database.
   * @returns An array of all records from the specified table in the database with all columns
   * selected.
   */
  findAll(filter: Partial<Plano> | Plano) {
    return this.database.supabase.from(tableName).select('*').match({...filter}).order('id', {
      ascending: true
    });
  }

  /**
   * The `create` function inserts a new record on database using the provided user data.
   * @param {Plano} body - The `body` parameter in the `create` function likely represents the data or
   * object of type `Plano` that you want to insert into a database table. It contains the information
   * or fields that you want to store in the database.
   * @returns The `create` function is returning the result of inserting the `body` object into the
   * specified table in the database.
   */
  create(body: Plano) {
    return this.database.supabase.from(tableName).insert(body, {});
  }

  /**
   * The `update` function updates a record on database table with the provided partial user
   * data.
   * @param body - The `body` parameter in the `update` function is a partial object of type `Plano`.
   * It contains the data that needs to be updated in the database for a specific user.
   * @returns The `update` method is returning a promise that represents the result of updating the
   * record in the database table specified by `tableName` with the data provided in the `body` object.
   */
  update(body: Partial<Plano>) {
    return this.database.supabase
      .from(tableName)
      .update(body)
      .eq('id', body.id);
  }
}
