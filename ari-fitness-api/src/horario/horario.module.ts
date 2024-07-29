import { Module } from '@nestjs/common';
import { HorarioController } from './horario.controller';
import { HorarioService } from './horario.service';
import { DataBaseModule } from 'src/datasource/database.module';

@Module({
    controllers: [HorarioController],
    providers: [HorarioService],
    imports:[DataBaseModule]
})
export class HorarioModule {};