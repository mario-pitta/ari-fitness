/* eslint-disable prettier/prettier */
/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { GeminiService } from './gemini.service';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { EmpresaService } from 'src/empresa/empresa.service';

@Controller('ai/gemini')
export class GeminiController {
  gen: GoogleGenerativeAI;
  model: any;
  constructor(
    private geminiService: GeminiService,
    private empresaService: EmpresaService,
  ) {}

  @Get('relatorio-financas/:empresaId')
  async getFinanceReport(
    @Param('empresaId') empresaId: string,
    @Query('data_inicio') data_inicio: string,
    @Query('data_fim') data_fim: string,
  ) {
    if (!empresaId)
      throw new Error(JSON.stringify('Parametro empresaId nao informado'));

    const empresa = await this.empresaService.getEmpresa(empresaId);
    console.log('empresa: ', empresa);

    if (empresa.error) throw new Error(JSON.stringify(empresa.error.message));

    return this.geminiService.getFinanceReport(empresa.data, {
      data_inicio: data_inicio,
      data_fim: data_fim,
    });
    // .then((res) => JSON.parse(res));
  }

  @Get('ficha-treino/:alunoId/:empresaId')
  async buildAlunoTreino(
    @Param('alunoId') alunoId: string,
    @Param('empresaId') empresaId: string,
  ) {
    console.log('buildAlunoTreino', alunoId, empresaId);

    let error = null;
    if (!alunoId) error = new Error('Parametro alunoId nao informado');

    if (!empresaId) error = new Error('Parametro empresaId nao informado');

    if (error) return error;

    return this.geminiService.buildTreinoDoAluno(alunoId, empresaId);
  }

}
