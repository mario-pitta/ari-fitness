/*
https://docs.nestjs.com/providers#services
*/
/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import { DataBaseService } from 'src/datasource/database.service';

@Injectable()
export class AuthService {
  constructor(private supabase: DataBaseService) {}

  login(cpf: string, dataNascimento: string) {
    console.log('logando...', cpf, dataNascimento);
    return this.supabase.supabase
      .from('usuario')
      .select('*')
      .eq('cpf', cpf)
      .eq('data_nascimento', dataNascimento);
  }
}
