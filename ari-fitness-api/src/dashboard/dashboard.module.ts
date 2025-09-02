/* eslint-disable prettier/prettier */
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { DataBaseModule } from 'src/datasource/database.module';
import { TransacaoFinanceiraDashModule } from './transacao-financeira/transacao-financeira-dash.module';
import { DataBaseService } from 'src/datasource/database.service';

@Module({
  imports: [DataBaseModule, TransacaoFinanceiraDashModule],
  controllers: [DashboardController],
  providers: [DashboardService, DataBaseService],
})
export class DashboardModule {}
