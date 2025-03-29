/* eslint-disable prettier/prettier  */
import {  Module } from '@nestjs/common';
import { TransacaoFinanceiraDashService } from './transacao-financeira-dash.service';
import { TransacaoFinanceiraDashController } from './transacao-financeira-dash.controller';
import { DataBaseModule } from 'src/datasource/database.module';

@Module({
    imports: [DataBaseModule],
    controllers: [TransacaoFinanceiraDashController],
    providers: [TransacaoFinanceiraDashService],
})
export class TransacaoFinanceiraDashModule {}
