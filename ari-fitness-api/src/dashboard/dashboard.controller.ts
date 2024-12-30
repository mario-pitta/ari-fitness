/* eslint-disable prettier/prettier */
/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get,  Query } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
  constructor(private dashboardService: DashboardService) {}

  @Get('total-members-data')
  async getTotalMembers(@Query() query: any) {
    
    return this.dashboardService.getAllMembersDashboard(query);
  }    



}
