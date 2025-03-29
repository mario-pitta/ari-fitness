/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { EventoController } from './evento.controller';
import { EventoService } from './evento.service';
import { DataBaseModule } from 'src/datasource/database.module';

@Module({
  controllers: [
    EventoController
  ],
  providers: [
    EventoService
  ],
  exports: [],
  imports: [DataBaseModule],
})
export class EventoModule {}
