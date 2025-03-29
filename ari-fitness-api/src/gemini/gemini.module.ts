/* eslint-disable prettier/prettier */
/*
https://docs.nestjs.com/modules
*/
import { TransacaoFinanceiraModule } from 'src/transacao_financeira/transacao-financeira.module';
import { GeminiController } from './gemini.controller';
import { GeminiService } from './gemini.service';

import { Module } from '@nestjs/common';
import { EmpresaModule } from 'src/empresa/empresa.module';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { ExercicioModule } from 'src/exercicio/exercicio.module';
import { EquipamentoModule } from 'src/equipamento/equipamento.module';

import { FichaAlunoModule } from 'src/ficha-usuario/ficha-aluno.module';

@Module({
  imports: [
    TransacaoFinanceiraModule, 
    EmpresaModule,
    UsuarioModule, 
    ExercicioModule,
    EquipamentoModule,
    FichaAlunoModule

  ],
  controllers: [GeminiController],
  providers: [GeminiService],
})
export class GeminiModule {}
