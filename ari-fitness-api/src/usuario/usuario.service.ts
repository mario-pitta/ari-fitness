/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { DataBaseService } from 'src/datasource/database.service';
import { Usuario } from './Usuario.interface';
import md5 = require('md5');
import { TransacaoFinanceira } from 'src/transacao_financeira/TransacaoFinanceira.interface';

const tableName = 'usuario';

@Injectable()
export class UsuarioService {
  constructor(private database: DataBaseService) {}

  /**
   * The `findAll` function retrieves all records from a specified table in a database.
   * @returns An array of all records from the specified table in the database with all columns
   * selected.
   */
  findAll() {
    return this.database.supabase.from(tableName).select('*').order('nome', {
      ascending: true,
    });
  }

  checkAdimplencia(user: Usuario, transacoes: [], isFirstUser: boolean): boolean {
    
    //Cria uma lista de meses desde que o aluno foi cadastrado ate a data atual
    const meses: {
      ano: number;
      mes: number;
      label: string;
      pago: boolean;
    }[] = [];
    const dataAtual = new Date();
    const dataCadastro = new Date(user.created_at as string);

    const anoCadastro = dataCadastro.getFullYear();
    const mesCadastro = dataCadastro.getMonth();

    const anoAtual = dataAtual.getFullYear();
    const mesAtual = dataAtual.getMonth();

    for (let ano = anoCadastro; ano <= anoAtual; ano++) {
      const mesInicio = ano === anoCadastro ? mesCadastro : 0;
      const mesFim = ano === anoAtual ? mesAtual : 11;
      for (let mes = mesInicio; mes <= mesFim; mes++) {
        meses.push({ ano, mes, label: `${mes + 1}/${ano}`, pago: false });
      }
    }

    transacoes.forEach((t: TransacaoFinanceira) => {
      if (t.fl_pago) {
        // const dataPagamento = new Date(t.data_lancamento as string);
        const anoPagamento = t.ano;
        const mesPagamento = t.mes - 1; //-1 pq o mes vem 1-12 e o getMonth() retorna 0-11

        const mesHistorico = meses.find(
          (m) => m.ano === anoPagamento && m.mes === mesPagamento,
        );
        // atualiza o mes como pago
        if (mesHistorico) {
          // console.log('houve pagamento em ', mesHistorico.label);
          meses.find(
            (m) => m.ano === anoPagamento && m.mes === mesPagamento,
          )!.pago = true;
        }
      }
    });
    
    //Se for o primeiro usuario, loga os meses
    // if (isFirstUser) {
    //   console.log('usuario cadastrado em ', dataCadastro);
    //   console.log('numero de transacoes ', transacoes.length); 
    //   console.log('data atual ', dataAtual);
    //   console.log('meses do usuario ', user.nome, meses);
    // }
    return meses.every((m) => m.pago);
  }

  async findByFilters(filters: Partial<Usuario> | Usuario) {
    const res = await this.database.supabase
      .from(tableName)
      .select(
        `*,
        horarios ( 
          *
        ), 
        planos (
          *
        ), 
        transacao_financeira!transacao_financeira_pago_por_fkey (
          *
        )
        `,
      )
      .match({ ...filters })
      .order('nome', {
        ascending: true,
      });

    // console.log('res do findByFilters', res);
    if (!res.error) {
      res.data = res.data?.map((u, i) => ({
        ...u,
        fl_adimplente: this.checkAdimplencia(u, u.transacao_financeira as [], i === 2),
      }));
    }


    return res;
  }

  /**
   * The `create` function inserts a new record on database using the provided user data.
   * @param {Usuario} body - The `body` parameter in the `create` function likely represents the data or
   * object of type `Usuario` that you want to insert into a database table. It contains the information
   * or fields that you want to store in the database.
   * @returns The `create` function is returning the result of inserting the `body` object into the
   * specified table in the database.
   */
  create(body: Usuario) {
    console.log('creating new user: ', body);
    console.log(md5('message'));
    return this.database.supabase
      .from(tableName)
      .insert(
        {
          ...body,
          senha: md5('123456'),
        },
        {},
      )
      .then((res) => {
        // console.log('RES: ', res);

        return res;
      });
  }

  /**
   * The `update` function updates a record on database table with the provided partial user
   * data.
   * @param body - The `body` parameter in the `update` function is a partial object of type `Usuario`.
   * It contains the data that needs to be updated in the database for a specific user.
   * @returns The `update` method is returning a promise that represents the result of updating the
   * record in the database table specified by `tableName` with the data provided in the `body` object.
   */
  async update(body: Partial<Usuario>) {
    console.log('updateUsuario body: ', body);

    return await this.database.supabase
      .from(tableName)
      .update(body)
      .eq('id', body.id)
      .select('*');
  }

  findInstrutorByFilters(empresaId: number, filters: any) {
    return this.database.supabase
      .from(tableName)
      .select(
        `*,
        alunos: ficha_aluno!ficha_aluno_instrutor_id_fkey(
          *,
          usuario: usuario!ficha_aluno_usuario_id_fkey(
            id, 
            nome, 
            data_nascimento,

            genero,
            *
          )
        )
        `,
      )
      .eq('tipo_usuario', 2)
      .eq('empresa_id', empresaId)
      .match({
        ...filters,
      });
  }
}
