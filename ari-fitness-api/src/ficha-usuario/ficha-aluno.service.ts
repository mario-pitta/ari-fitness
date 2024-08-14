/* eslint-disable prettier/prettier */
/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { DataBaseService } from 'src/datasource/database.service';
import { IFichaAluno } from './FichaAluno.interface';

@Injectable()
export class FichaAlunoService {
  constructor(private database: DataBaseService) {}

  findAll(filters?: IFichaAluno | Partial<IFichaAluno>) {
    return this.database.supabase
      .from('ficha_aluno')
      .select(
        `
            *,
             cadastrado_por: usuario!ficha_aluno_cadastrado_por_fkey(id, nome),
            instrutor: usuario!ficha_aluno_instrutor_id_fkey(id, nome),
             aluno: usuario!ficha_aluno_usuario_id_fkey(id, nome)
           
        `,
      )
      .match({ ...filters })
      .then((res) => {
        if (res.error) return res;

        return res;
      });
  }

  getById(id: number) {
    return this.database.supabase
      .from('ficha_aluno')
      .select(
        `
            *,
             cadastrado_por: usuario!ficha_aluno_cadastrado_por_fkey(id, nome),
            instrutor: usuario!ficha_aluno_instrutor_id_fkey(id, nome),
             aluno: usuario!ficha_aluno_usuario_id_fkey(id, nome),
            treinos_cadastrados: ficha_aluno_treino(
                treino(
                    *,
                    exercicios: treino_exercicio(
                        *, 
                        equipamentos(*),
                        grupo_muscular(*),
                        parte_do_corpo(*),
                        exercicio: exercicios(
                            *,
                            equipamento: equipamentos(*),
                            grupo_muscular(*)                            
                            )
                        )
                    )
                )
        `,
      )
      .eq('id', id)
      .then((res) => {
        if (res.error) return res;

        return res;
      });
  }

  getByUser(userId: number, filters: Partial<IFichaAluno>) {
    return this.database.supabase
      .from('ficha_aluno')
      .select(
        `
            *, 
            cadastrado_por: usuario!ficha_aluno_cadastrado_por_fkey(id, nome),
            instrutor: usuario!ficha_aluno_instrutor_id_fkey(id, nome),
            aluno: usuario!ficha_aluno_usuario_id_fkey(id, nome),
            treinos_cadastrados: ficha_aluno_treino(
                treino(
                     *,
                    exercicios: treino_exercicio(
                        *, 
                        equipamentos(*),
                        grupo_muscular(*),
                        parte_do_corpo(*),
                        exercicio: exercicios(
                            *,
                            equipamento: equipamentos(*),
                            grupo_muscular(*)                            
                            )
                        )
                    )
                )
        `,
      )
      .eq('usuario_id', userId)
      .match({ ...filters })
      .then(async (res) => {
        if (res.error) return res;

        return res;
      });
  }

  async create(body: IFichaAluno) {
    let _treinos = body.treinos as any;
    delete body.treinos;

    try {
      console.log('desativar afichas antigas...');
      await this.database.supabase
        .from('ficha_aluno')
        .update({ fl_ativo: false })
        .eq('usuario_id', body.usuario_id);

      return this.database.supabase
        .from('ficha_aluno')
        .insert(body)
        .select('id')
        .then(async (res) => {
          if (res.error) return res;

          console.log('cadastrou a ficha_treino: ', res.data);
          const id = res.data[0].id;
          if (_treinos) {
            console.log('vai cadastrar os treinos...', _treinos);
            _treinos = _treinos.map((_tr: { id: number }) => {
              return {
                ficha_id: id,
                treino_id: _tr.id,
              };
            });
            await this.database.supabase
              .from('ficha_aluno_treino')
              .insert(_treinos)

              .select('*')
              .then(async (_res) => {
                if (_res.error) {
                  await this.database.supabase
                    .from('ficha_aluno')
                    .delete()
                    .eq('id', id);
                  throw new Error(JSON.stringify(_res));
                }

                console.log('cadastrou os treinos fichas do aluno');
                return _res;
              });
          }

          console.log('vai voltar para o controller.... RETORNANDO');
          return res;
        });
    } catch (error) {}
  }

  update(body: Partial<IFichaAluno>) {
    let _treinos = body.treinos as any;
    delete body.treinos;
    return this.database.supabase
      .from('ficha_aluno')
      .update(body)
      .eq('id', body.id)
      .then(async (res) => {
        if (res.error) return res;
        console.log('vai apagar ficha_aluno_treino antigos...');
        await this.database.supabase
          .from('ficha_aluno_treino')
          .delete()
          .eq('ficha_id', body.id);

        if (_treinos) {
          console.log('vai cadastrar os treinos...', _treinos);
          _treinos = _treinos.map((_tr: { id: number }) => {
            return {
              ficha_id: body.id,
              treino_id: _tr.id,
            };
          });
          await this.database.supabase
            .from('ficha_aluno_treino')
            .insert(_treinos)

            .select('*')
            .then(async (_res) => {
              if (_res.error) {
                await this.database.supabase
                  .from('ficha_aluno')
                  .delete()
                  .eq('id', body.id);
                throw new Error(JSON.stringify(_res));
              }

              console.log('cadastrou os treinos fichas do aluno');
              return _res;
            });
        }

        console.log('vai voltar para o controller.... RETORNANDO');
        return res;
      });
  }
}
