/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { DataBaseService } from 'src/datasource/database.service';
import { IEvento } from './Evento.interface';

const tableName = 'evento';

@Injectable()
export class EventoService {
  constructor(private database: DataBaseService) {}

  findAllByFilters(filters: Partial<IEvento>) {
    if(filters.data_inicio) filters.data_inicio = new Date(filters.data_inicio).toISOString().split('T')[0];
    if(filters.data_fim) filters.data_fim = new Date(filters.data_fim).toISOString().split('T')[0];



    return this.database.supabase
      .from(tableName)
      .select(`
            *,
            tipo_evento:tipo_evento_id(*),
            status_evento:status_evento_id(*),
            usuario: usuario!evento_criado_por_fkey(
                id,
                nome,
                empresa_id,
                empresa:empresa_id(*),
                flagAdmin
            )
            
        `)
      .eq('empresa_id', filters.empresa_id)
      .gte('data_inicio', filters.data_inicio)
      .lte('data_inicio', filters.data_fim)
      .order('data_inicio', { ascending: true });
  }

  create(body: IEvento) {
    return this.database.supabase.from(tableName).insert(body).select();
  }


  update(body: Partial<IEvento>) {
    return this.database.supabase
      .from(tableName)
      .upsert(body)
      .eq('id', body.id).select();
  }
}
