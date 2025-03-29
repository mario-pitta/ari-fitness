/* eslint-disable prettier/prettier */
import { DataBaseModule } from 'src/datasource/database.module';
import { EmpresaController } from './empresa.controller';
import { EmpresaService } from './empresa.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';

@Module({
  imports: [DataBaseModule],
  controllers: [EmpresaController],
  providers: [EmpresaService],
  exports: [EmpresaService],
})
export class EmpresaModule {}
