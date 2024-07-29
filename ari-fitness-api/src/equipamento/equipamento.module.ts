import { Module } from '@nestjs/common';
import { EquipamentoController } from './equipamento.controller';
import { DataBaseModule } from 'src/datasource/database.module';
import { EquipamentoService } from './equipamento.service';

@Module({
    controllers: [EquipamentoController],
    providers: [EquipamentoService],
    imports:[DataBaseModule]
})
export class EquipamentoModule {};