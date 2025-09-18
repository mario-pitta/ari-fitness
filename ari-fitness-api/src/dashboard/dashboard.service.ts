/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Usuario } from '../usuario/Usuario.interface';
import { DataBaseService } from 'src/datasource/database.service';

@Injectable()
export class DashboardService {
  constructor(private database: DataBaseService) {}

  getAllMembersDashboard(filters?: Partial<Usuario> | Usuario) {
    console.log('filters: ', filters);

    return this.database.supabase
      .from('usuario')
      .select(
        `*,
            plano: planos ( * ),
            horario: horarios ( * )
            `,
        { count: 'exact' },
      )
      .match({ ...filters })
      .then((res: any) => {
        if (res.error) return res;
        const genero = {
          male: 0,
          female: 0,
        };
        let memberAtLastMonth = 0;
        let newMembers = 0;
        let newMembersTendency = 0;
        const newMemberGender = {
          male: 0,
          female: 0,
        };
        const horarios = {} as any;

        res.data.forEach((user: Usuario) => {
          const dataCadastro = new Date(user.created_at);

          if (
            dataCadastro.getMonth() < new Date().getMonth() - 1 &&
            dataCadastro.getFullYear() <= new Date().getFullYear()
          )
            memberAtLastMonth++;
          if (user.genero === 'M') genero.male++;
          if (user.genero === 'F') genero.female++;
          if (dataCadastro.getMonth() == new Date().getMonth()) newMembers++;
          if (dataCadastro.getMonth() == new Date().getMonth() - 1)
            newMembersTendency++;
          if (
            user.genero === 'M' &&
            dataCadastro.getMonth() == new Date().getMonth()
          )
            newMemberGender.male++;
          if (
            user.genero === 'F' &&
            dataCadastro.getMonth() == new Date().getMonth()
          )
            newMemberGender.female++;

          const hora = user?.horario?.hora_inicio.slice(0, 5);
          if (!horarios[hora]) {
            horarios[hora] = 1;
          } else {
            horarios[hora]++;
          }
        });

        return {
          totalMembers: {
            male: genero.male,
            female: genero.female,
            total: res.count,
          },
          newMembers: {
            total: newMembers,
            tendency: newMembersTendency,
            male: newMemberGender.male,
            female: newMemberGender.female,
          },
          memberAtLastMonth,
          horarios,
        };
      });
  }

  async getBestInstrutoresData(empresaId: string) {
    try {
      const { data, error } = await this.database.supabase
        .from('usuario')
        .select(
          `
          id,
          nome,
          genero,
          tipo_usuario (id, nome),
          ficha_aluno:ficha_aluno!ficha_aluno_instrutor_id_fkey(
            fl_ativo,
            ficha_data_fim,
            ficha_data_inicio,
            usuario:usuario!ficha_aluno_usuario_id_fkey(id, nome, genero),
            created_at
          )
        `,
        )
        .eq('empresa_id', empresaId)
        .eq('tipo_usuario', 2);

      if (error) {
        throw new Error(
          `Erro ao obter dados dos instrutores: ${JSON.stringify(error)}`,
        );
      }

      const bestInstrutores = data

        ?.slice(0, 3)
        ?.map((instrutor: any) => {
          const fichasAtivas = instrutor.ficha_aluno.filter(
            (ficha: any) => ficha.fl_ativo,
          ).length;
          const { fichasMesPassado, fichasMesAtual } = this.contarFichasPorMes(
            instrutor.ficha_aluno,
          );
          const percentualDiferenca = this.calcularPercentualDiferenca(
            fichasMesPassado,
            fichasMesAtual,
          );

          return {
            id: instrutor.id,
            nome: instrutor.nome,
            genero: instrutor.genero,
            fichasAtivas,
            fichasMesPassado,
            fichasMesAtual,
            percentualDiferenca,
          };
        })
        ?.sort((a: any, b: any) => b.fichasAtivas - a.fichasAtivas);

      return bestInstrutores;
    } catch (error) {
      console.error('Erro em getBestInstrutoresData:', error);
      throw error;
    }
  }

  private contarFichasPorMes(fichas: any[]) {
    const dataAtual = new Date();
    const mesAtual = dataAtual.getMonth();
    const anoAtual = dataAtual.getFullYear();

    const fichasMesPassado = fichas.filter((ficha) => {
      const dataFicha = new Date(ficha.created_at);
      const mesFicha = dataFicha.getMonth();
      const anoFicha = dataFicha.getFullYear();

      if (anoFicha < anoAtual) {
        return true;
      }

      if (anoFicha === anoAtual) {
        return mesFicha === mesAtual - 1;
      }

      return false;
    }).length;

    const fichasMesAtual = fichas.filter((ficha) => {
      const dataFicha = new Date(ficha.created_at);
      const mesFicha = dataFicha.getMonth();
      const anoFicha = dataFicha.getFullYear();

      return anoFicha === anoAtual && mesFicha === mesAtual;
    }).length;

    return { fichasMesPassado, fichasMesAtual };
  }

  private calcularPercentualDiferenca(
    mesPassado: number,
    mesAtual: number,
  ): string {
    let percentualDiferenca = 0;
    if (mesPassado !== 0) {
      percentualDiferenca = ((mesAtual - mesPassado) / mesPassado) * 100;
    }
    return parseInt(percentualDiferenca.toString()) + '%';
  }

  /**
   * Gets the total number of members, instructors, and other data for the given company.
   * @param {string} empresaId The id of the company.
   * @returns {Promise<number[]>} A promise that resolves with an array of numbers containing the total number of members, instructors, financial reports, and other data.
   */
  async getTotals(empresaId: string) {
    let totals = {
      totalMembros: 0,
      totalInstrutores: 0,
      totalReceitas: 0,
      totalDespesas: 0,
      totalAulas: 0,
      totalFichas: 0,
      receita_por_mes: [] as {
        mes: number;
        ano: number;
        mesAno: string;
        valor: number;
      }[],
      despesa_por_mes: [] as {
        mes: number;
        ano: number;
        mesAno: string;
        valor: number;
      }[],
    };

    const totalMembros = await this.database.supabase
      .from('usuario')
      .select('id', { count: 'exact' })
      .eq('empresa_id', empresaId)
      .eq('tipo_usuario', 5); //tipo_usuario 5 = aluno/membro
    if (totalMembros.error) {
      throw new Error(
        `Erro ao obter total de membros: ${JSON.stringify(totalMembros.error)}`,
      );
    }

    console.log('totalMembros', totalMembros);

    totals.totalMembros = totalMembros.count || 0;

    const totalInstrutores = await this.database.supabase
      .from('usuario')
      .select('id', { count: 'exact' })
      .eq('empresa_id', empresaId)
      .eq('tipo_usuario', 2); //tipo_usuario 2 = instrutor
    if (totalInstrutores.error) {
      throw new Error(
        `Erro ao obter total de instrutores: ${JSON.stringify(
          totalInstrutores.error,
        )}`,
      );
    }
    totals.totalInstrutores = totalInstrutores.count || 0;

    const transacoes = await this.database.supabase
      .from('transacao_financeira')
      .select('id, valor_final, tr_tipo_id, data_lancamento')
      .eq('empresa_id', empresaId);

    if (transacoes.error) {
      throw new Error(
        `Erro ao obter transações: ${JSON.stringify(transacoes.error)}`,
      );
    }

    //obtem os 12 ultimos meses 
    const dataAtual = new Date();
    const initial_date = new Date();
    initial_date.setMonth(dataAtual.getMonth() - 11);


     const processTransactionByDateAndType = (data_lancamento: string, tr_tipo_id: number, valor_final: number) => {
      const transacaoDate = new Date(data_lancamento);
      if (transacaoDate >= initial_date && transacaoDate <= dataAtual) {
        const mes = new Date(data_lancamento).getMonth();
        const ano = new Date(data_lancamento).getFullYear();
        const mesAno = `${mes + 1}/${ano}`;
        const payload = { mes, ano, mesAno };

        const propertyName: 'receita_por_mes' | 'despesa_por_mes' = tr_tipo_id === 1 ? 'receita_por_mes' : 'despesa_por_mes';

        if (!totals[propertyName].find((r) => r.mesAno === mesAno)) {
          totals[propertyName].push({ ...payload, valor: valor_final });
        } else {
          const index = totals[propertyName].findIndex(
            (r) => r.mesAno === mesAno,
          );
          totals[propertyName][index].valor += valor_final;
        }
      }
    };

    transacoes.data?.forEach((transacao) => {
      const { valor_final, tr_tipo_id, data_lancamento } = transacao;

      switch (tr_tipo_id) {
        case 1:
          totals.totalReceitas += valor_final;
          break;
        case 2:
          totals.totalDespesas += valor_final;
          break;

        default:
          break;
      }

      processTransactionByDateAndType(data_lancamento as string, tr_tipo_id, valor_final);
    
       
    });

    totals.receita_por_mes = totals.receita_por_mes.sort((a, b) => {
      if (a.ano === b.ano) {
        return a.mes - b.mes;
      }
      return a.ano - b.ano;
    });
    totals.despesa_por_mes = totals.despesa_por_mes.sort((a, b) => {
      if (a.ano === b.ano) {
        return a.mes - b.mes;
      }
      return a.ano - b.ano;
    });
    return totals;
  }

  async getMembersByPlan(empresaId: string) {
    const { data, error } = await this.database.supabase
      .from('usuario')
      .select('plano_id, planos(nome), count:id')
      .eq('empresa_id', empresaId)
      .eq('tipo_usuario', 5)
      .group('plano_id, planos(nome)');

    if (error) {
      throw new Error(`Erro ao obter membros por plano: ${JSON.stringify(error)}`);
    }

    // Map result to a more readable format
    return data?.map((item: any) => ({
      planoId: item.plano_id,
      planoNome: item.planos?.nome,
      totalMembros: item.count
    })) || [];
  }
}
