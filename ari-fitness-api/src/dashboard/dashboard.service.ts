/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Usuario } from '../usuario/Usuario.interface';
import { DataBaseService } from 'src/datasource/database.service';


@Injectable()
export class DashboardService {
  constructor(private database: DataBaseService) { }

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
        .select(`
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
        `)
        .eq('empresa_id', empresaId)
        .eq('tipo_usuario', 2);

      if (error) {
        throw new Error(`Erro ao obter dados dos instrutores: ${JSON.stringify(error)}`);
      }

      const bestInstrutores = data
      
      ?.slice(0, 3)
      ?.map((instrutor: any) => {
        const fichasAtivas = instrutor.ficha_aluno.filter((ficha: any) => ficha.fl_ativo).length;
        const { fichasMesPassado, fichasMesAtual } = this.contarFichasPorMes(instrutor.ficha_aluno);
        const percentualDiferenca = this.calcularPercentualDiferenca(fichasMesPassado, fichasMesAtual);

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
      ?.sort((a: any, b: any) => b.fichasAtivas - a.fichasAtivas) 

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

    const fichasMesPassado = fichas.filter(ficha => {
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

    const fichasMesAtual = fichas.filter(ficha => {
      const dataFicha = new Date(ficha.created_at);
      const mesFicha = dataFicha.getMonth();
      const anoFicha = dataFicha.getFullYear();

      return anoFicha === anoAtual && mesFicha === mesAtual;
    }).length;

    return { fichasMesPassado, fichasMesAtual };
  }

  private calcularPercentualDiferenca(mesPassado: number, mesAtual: number): string {
    let percentualDiferenca = 0;
    if (mesPassado !== 0) {
      percentualDiferenca = ((mesAtual - mesPassado) / mesPassado) * 100;
    }
    return parseInt(percentualDiferenca.toString()) + '%';
  }
}
