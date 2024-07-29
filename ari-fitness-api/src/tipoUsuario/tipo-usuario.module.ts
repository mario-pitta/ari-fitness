/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { TipoUsuarioController } from './tipo-usuario.controller';
import { TipoUsuarioService } from './tipo-usuario.service';
import { DataBaseModule } from 'src/datasource/database.module';

@Module({
  imports: [DataBaseModule],
  controllers: [TipoUsuarioController],
  providers: [TipoUsuarioService],
})
export class TipoUsuarioModule {}
