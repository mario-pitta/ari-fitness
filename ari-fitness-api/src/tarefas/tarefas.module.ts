/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TarefaController } from './tarefas.controller';
import { TarefaService } from './tarefas.service';
import { DataBaseModule } from 'src/datasource/database.module';

@Module({
  controllers: [TarefaController],
  providers: [TarefaService],
  imports: [DataBaseModule],
})
export class TarefaModule {}
