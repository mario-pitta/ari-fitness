/* eslint-disable prettier/prettier  */
import { Injectable } from '@nestjs/common';
import { DataBaseService } from 'src/datasource/database.service';
import { TransacaoFinanceira } from 'src/transacao_financeira/TransacaoFinanceira.interface';

@Injectable()
export class TransacaoFinanceiraDashService {
  constructor(private database: DataBaseService) {}

  buildDashboardData(query: {data_inicio: string, data_fim: string, empresa_id: string}) {
    console.log('query: ', query);
    return this.database.supabase
      .from('transacao_financeira')
      .select(
        `
                *, 
                tipo_transacao_financeira(*),
                categoria_transacao_financeira(*)
                
            `,
      )
      .eq('empresa_id', query.empresa_id)
      .eq('fl_ativo', true)
      .gte('data_lancamento', query.data_inicio)
      .lte('data_lancamento', query.data_fim)
      .then((_res) => {
        if (_res.error) {
          console.error('erro no TransacaoFinanceira/findAll', _res.error);
          return _res.error;
        }

        const dashboardData: any = {
          totalReceitas: 0,
          totalDespesas: 0,
          saldo: 0,
          totalReceitasPorCategoria: [],
          totalDespesasPorCategoria: [],
        };

        if (!_res.data) return dashboardData;
        _res.data.forEach((item: TransacaoFinanceira) => {
          //receitas
          if (item.tr_tipo_id === 1) {
            dashboardData.totalReceitas += item.valor_final || 0;
            dashboardData.saldo += item.valor_final || 0;

            const found = dashboardData.totalReceitasPorCategoria.find(
              (i: any) => i.tr_categoria_id === item.tr_categoria_id,
            );
            if (!found) {
              dashboardData.totalReceitasPorCategoria.push({
                tr_categoria_id: item.tr_categoria_id,
                valor_final: item.valor_final || 0,
                descricao: item.categoria_transacao_financeira?.descricao || '',
              });
            } else {
              found.valor_final += item.valor_final || 0;
            }
          }

          //despesas
          if (item.tr_tipo_id === 2) {
            dashboardData.totalDespesas += item.valor_final || 0;
            dashboardData.saldo -= item.valor_final || 0;
            const found = dashboardData.totalDespesasPorCategoria.find(
              (i: any) => i.tr_categoria_id === item.tr_categoria_id,
            );
            if (!found) {
              dashboardData.totalDespesasPorCategoria.push({
                tr_categoria_id: item.tr_categoria_id,
                valor_final: item.valor_final || 0,
                descricao: item.categoria_transacao_financeira?.descricao || '',
              });
            } else {
              found.valor_final += item.valor_final || 0;
            }
          }
        });

        return dashboardData;
      });
  }
}
