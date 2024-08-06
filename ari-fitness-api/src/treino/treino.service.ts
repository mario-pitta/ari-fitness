/* eslint-disable prettier/prettier */
/*
https://docs.nestjs.com/providers#services
*/
import { DataBaseService } from 'src/datasource/database.service';

import { Injectable } from '@nestjs/common';
import { Treino, TreinoExercicioRelation } from './Treino.interface';

@Injectable()
export class TreinoService {
  constructor(private database: DataBaseService) {}

  private buidTreinoExercicioBody(
    ex: TreinoExercicioRelation,
    treino_id: number,
  ) {
    return {
            series: ex.series,
      repeticoes: ex.repeticoes,
      intervalo: ex.intervalo,
      carga: ex.carga,
      exercicio_id: ex.exercicio?.id | ex.exercicios?.id,
      equipamento_id: ex.equipamento?.id,
      treino_id: treino_id,
    };
  }

  findAll(filters: Treino) {
    return this.database.supabase
      .from('treino')
      .select(
        `
        *,
        grupo_muscular(*),
        parte_do_corpo(*),
        treino_exercicio(
          *,
          exercicios(*),
          equipamentos(*),
          grupo_muscular(*),
          parte_do_corpo(*)
        )`,
      )
      .match({ ...filters })
      .order('nome', {
        ascending: true,
      });
  }
  create(body: Treino) {
    let exercicios = body.exercicios;
    delete body.exercicios;
    delete body.grupo_muscular;
    delete body.parte_do_corpo;
    delete body.id;
    console.log('body after exercicios delete....', body);
    console.log('exercicios extracted....', exercicios);

    return this.database.supabase
      .from('treino')
      .insert(body)
      .select('*')
      .then(async (res) => {
        if (res.error) {
          console.error(res.error);
          return res;
        }

        console.log('saved TREINO', res.data);

        if (exercicios) {
          exercicios = exercicios.map((ex: TreinoExercicioRelation) => {
            return this.buidTreinoExercicioBody(ex, res.data[0].id);
          });

          console.log('associating exercicios', exercicios);

          const { data, error } = await this.database.supabase
            .from('treino_exercicio')
            .insert(exercicios)
            .then((e) => e);

          if (error) {
            console.error(error);
            return res;
          }

          return {
            ...res,
            data: {
              ...(res.data as unknown as Treino[]),
              exercicios: data,
            },
          } as any;
        }

        return res;
      });
  }

  /**
   * The function `update` in TypeScript updates a training record in a database, including handling
   * related exercises.
   * @param {Treino} body - The `update` function you provided seems to be updating a training plan in a
   * database. It first extracts the exercises from the body, deletes them from the body object, and
   * then updates the training plan in the 'treino' table. After updating the training plan, it deletes
   * existing exercises associated with
   * @returns The `update` method is returning a Promise that resolves to an object containing the
   * updated `treino` data along with the newly inserted `exercicios` data. The structure of the
   * returned object is as follows:
   */
  update(body: Treino) {
    const exercicios = body.exercicios;
    delete body.exercicios;
    delete body.grupo_muscular;
    delete body.parte_do_corpo;

    return this.database.supabase
      .from('treino')
      .update(body)
      .eq('id', body.id)
      .select('*')
      .then(async (res) => {
        if (res.error) return res;

        const { error } = await this.database.supabase
          .from('treino_exercicio')
          .delete()
          .eq('treino_id', body.id)
          .then((e) => e);

        if (error) {
          console.error(error);
          return res;
        }

        const { data: _data, error: _error } = await this.database.supabase
          .from('treino_exercicio')
          .insert(
            exercicios?.map((ex: TreinoExercicioRelation) => {
              return this.buidTreinoExercicioBody(ex, body.id as number);
            }),
          );

        if (_error) {
          console.error(_error);

          return {
            ...res,
            error: _error,
          };
        }

        return {
          ...res,
          data: {
            ...res.data,
            exercicios: _data,
          },
        };
      });
  }

  delete(id: number) {
    return this.database.supabase
      .from('treino_exercicio')
      .delete()
      .eq('treino_id', id)
      .then((res) => {
        if (res.error) {
          console.error(res);
          return res;
        }

        return this.database.supabase
          .from('treino')
          .delete()
          .eq('id', id)
          .select('*');

      });
  }
}
