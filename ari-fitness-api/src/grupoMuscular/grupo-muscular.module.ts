/* eslint-disable prettier/prettier */
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { GrupoMuscularController } from './grupo-muscular.controller';
import { GrupoMuscularService } from './grupo-muscular.service';
import { DataBaseModule } from 'src/datasource/database.module';

@Module({
  imports: [DataBaseModule],
  controllers: [GrupoMuscularController],
  providers: [GrupoMuscularService],
})
export class GrupoMuscularModule {}
