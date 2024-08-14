/* eslint-disable prettier/prettier */
/*
https://docs.nestjs.com/modules
*/
import { FichaAlunoService } from './ficha-aluno.service';
import { DataBaseModule } from 'src/datasource/database.module';
import { FichaAlunoController } from './ficha-aluno.controller';

import { Module } from '@nestjs/common';

@Module({
  imports: [DataBaseModule],
  controllers: [FichaAlunoController],
  providers: [FichaAlunoService],
})
export class FichaAlunoModule {}
