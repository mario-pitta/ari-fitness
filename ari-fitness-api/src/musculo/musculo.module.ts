import { Module } from '@nestjs/common';
import { MusculoController } from './musculo.controller';
import { DataBaseModule } from 'src/datasource/database.module';
import { MusculoService } from './musculo.service';

@Module({
    controllers: [MusculoController],
    providers: [MusculoService],
    imports:[DataBaseModule]
})
export class MusculoModule {};