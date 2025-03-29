/* eslint-disable prettier/prettier  */
import { Controller, Get, Query, Res } from '@nestjs/common';
import { TransacaoFinanceiraDashService } from './transacao-financeira-dash.service';
import { Response } from 'express';

@Controller('transacao-financeira-dash')
export class TransacaoFinanceiraDashController {

    constructor(private transFinanServ: TransacaoFinanceiraDashService) {}

    @Get()
    findAll(@Query() query: {data_inicio: string, data_fim: string, empresa_id: string, orderBy: string, asc: boolean}, @Res() res: Response) {
        console.log('findAll query: ', query);
        if(!query.data_fim) query.data_fim = new Date().toISOString();
        //1 mes atras
        if(!query.data_inicio) query.data_inicio = new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString();
        
        return this.transFinanServ.buildDashboardData(query).then(_res => {
            res.send(_res);
        });
    }
}
