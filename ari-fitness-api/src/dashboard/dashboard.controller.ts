/* eslint-disable prettier/prettier */
/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get, Param, Query } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
  constructor(private dashboardService: DashboardService) {}

  @Get('total-members-data')
  async getTotalMembers(@Query() query: any) {
    return this.dashboardService.getAllMembersDashboard(query);
  }

  @Get('best-instrutores-data/:empresaId')
  async getBestInstrutoresData(
    @Param('empresaId') empresaId: string,
    @Query() payload: any,
  ) {
    const { mes } = payload;
    return await this.dashboardService.getBestInstrutoresData(empresaId);
  }

  @Get('members-by-plan/:empresaId')
  async getMembersByPlan(@Param('empresaId') empresaId: string) {
    return await this.dashboardService.getMembersByPlan(empresaId);
  }

  @Get('totals/:empresaId')
  async getTotals(@Param('empresaId') empresaId: string) {
    return await this.dashboardService.getTotals(empresaId);
  }
}
