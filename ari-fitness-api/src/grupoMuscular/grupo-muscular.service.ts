/* eslint-disable prettier/prettier */ /*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { DataBaseService } from 'src/datasource/database.service';
import { GrupoMuscular } from './GrupoMuscular.interface';

const tableName = 'grupo_muscular';

@Injectable()
export class GrupoMuscularService {
  constructor(private database: DataBaseService) {}

  findAll(filters?: GrupoMuscular) {
    return this.database.supabase
      .from(tableName)
      .select(`
        *,
        parte_do_corpo (
          *
        )
      `)
      .match({ ...filters })
      .order('nome', { ascending: true });
  }
  create(body: GrupoMuscular) {
    return this.database.supabase.from(tableName).upsert(body);
  }
  update(body: GrupoMuscular) {
    return this.database.supabase.from(tableName).upsert(body);
  }
}
