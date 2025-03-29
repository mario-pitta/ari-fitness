/* eslint-disable prettier/prettier */
/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { DataBaseService } from 'src/datasource/database.service';

@Injectable()
export class AuthService {
  constructor(private supabase: DataBaseService) {}

  login(cpf: string, senha: string) {
    console.log('logando...', cpf, senha);
    return this.supabase.supabase
      .from('usuario')
      .select(
        `
          *, 
          empresa: empresa(*),
          ficha_aluno: ficha_aluno!ficha_aluno_usuario_id_fkey(
            *, 
            treinos: ficha_aluno_treino!ficha_aluno_treino_ficha_id_fkey(
              *, 
              treino(
                *, 
                treino_exercicio(
                  *, 
                  exercicio: exercicios(
                    *
                  )
                )
              )
            )
          )
        `,
      )
      .eq('cpf', cpf)
      .eq('senha', senha);
  }



}
