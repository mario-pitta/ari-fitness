/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { DataBaseService } from 'src/datasource/database.service';
import { Usuario } from './Usuario.interface';
import md5 = require('md5');
import { TransacaoFinanceira } from 'src/transacao_financeira/TransacaoFinanceira.interface';

const tableName = 'usuario';

@Injectable()
export class UsuarioService {



  constructor(private database: DataBaseService) { }

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

  /**
   * This TypeScript function retrieves instructors based on specified filters for a given company ID
   * from a Supabase database.
   * @param {number} empresaId - The `empresaId` parameter is a number that represents the ID of the
   * company or organization for which you want to find instructors.
   * @param {any} filters - The `filters` parameter in the `findInstrutorByFilters` function is an
   * object that contains specific criteria for filtering the instructors. These criteria can be used to
   * narrow down the search results based on various attributes or properties of the instructors. The
   * function will apply these filters to the database query to retrieve
   * @returns This function is returning a query to the database to find instructors based on the
   * provided filters and the company ID. The query selects all columns from a table named `tableName`
   * where the `tipo_usuario` is 2 and the `empresa_id` matches the provided `empresaId`. It also
   * includes a nested query to fetch related data about the instructor's students and their user
   * information. The filters provided are
   */
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

  /**
   * Registra um novo check-in na tabela 'checkin_acesso'.
   *
   * @param {string} cpf - CPF do aluno ou visitante.
   * @param {string} nome - Nome do aluno ou visitante.
   * @param {string} empresaId - ID da academia onde o check-in ocorreu.
   * @param {string} [localizacao=''] - Coordenada GPS para validação de proximidade.
   * @returns {object} O registro inserido ou um erro.
   */
  async registrarCheckin(cpf: string, nome: string, empresaId: string) {
    // 1. **VALOR AGREGADO:** Lógica de Pré-Check-in (Implementar no Backend)

    // a) Verificar Status do Usuário: 
    // Esta consulta deve verificar se o CPF existe na 'usuario', se está ativo, se é aluno, etc.
    const { data: usuario, error: erroUsuario } = await this.database.supabase
      .from('usuario')
      .select('id, fl_ativo, tipo_usuario')
      .eq('cpf', cpf)
      .single();

    if (erroUsuario && erroUsuario.code !== 'PGRST116') { // PGRST116 = Não encontrou linha (Visitante)
      console.error("Erro ao verificar status do usuário:", erroUsuario);

      return { success: false, message: "Falha na comunicação com a base de usuários.", error: { message: "Falha na comunicação com a base de usuários." } };
    }

    const isVisitante = !usuario;
    if (!isVisitante && !usuario.fl_ativo) {
      // Exemplo de regra: impedir acesso se o aluno estiver inativo/inadimplente
      return { success: false, error: { message: 'Acesso negado: Matrícula inativa.' }, message: "Acesso negado: Matrícula inativa." };
    }

    // b) Prevenção de Abuso / Múltiplos Check-ins:
    // Verifica se houve um check-in recente na mesma empresa
    const { data: ultimoCheckin, error: erroUltimoCheckin } = await this.database.supabase
      .from('checkin_acesso')
      .select('data_hora')
      .eq('cpf_aluno', cpf)
      .eq('empresa_id', empresaId)
      .order('data_hora', { ascending: false })
      .limit(1)
      .single();

    console.log('💻🔍🪲 - cpf', cpf);


    console.log('💻🔍🪲 - ultimoCheckin', ultimoCheckin);
    console.error('💻🔍🪲 - erroUltimoCheckin', erroUltimoCheckin);





    if (ultimoCheckin) {
      const ultimaHora = new Date(ultimoCheckin.data_hora).getTime();
      const horaAtual = new Date().getTime();
      const tempoDecorridoMinutos = (horaAtual - ultimaHora) / (1000 * 60);
      console.log('💻🔍🪲 - tempoDecorridoMinutos', tempoDecorridoMinutos);


      if (tempoDecorridoMinutos < (12 * 60)) { // Ex: Intervalo de 12 horas
        const message = `Check-in já realizado recentemente. Próximo check-in liberado em ${180 - Math.floor(tempoDecorridoMinutos)} minutos.`;
        return { success: false, message, error: { message } };
      }
    }

    // 2. REGISTRO DO CHECK-IN
    try {
      const objCheckin = {
        cpf_aluno: cpf,
        empresa_id: empresaId,
        nome
        // A coluna 'data_hora' usará o valor padrão (CURRENT_TIMESTAMP) do banco de dados
      };

      const { data: novoRegistro, error: erroRegistro } = await this.database.supabase
        .from("checkin_acesso")
        .insert([objCheckin])
        .select('*'); // Solicita o retorno do registro inserido

      if (erroRegistro) {
        console.error("Erro ao inserir check-in:", erroRegistro);
        return { success: false, message: "Erro interno ao registrar acesso.", error: { message: "Erro interno ao registrar acesso." } };
      }

      // 3. PÓS-CHECK-IN: Lógica de Gamificação e Notificações (Assíncrono)
      // Aqui você dispararia a lógica para atualizar o streak ou dar um badge.
      // O ID do novo check-in é: novoRegistro[0].id
      // await atualizarStreak(cpf, novoRegistro[0].data_checkin);

      return { success: true, data: novoRegistro[0], message: "Acesso Liberado!", error: null };

    } catch (error) {
      console.error("Erro fatal durante o registro do check-in:", error);
      return { success: false, message: "Ocorreu um erro inesperado no sistema.", error: null };
    }
  }

  /**
   * This TypeScript function retrieves check-ins with user status for a specific empresa (company)
   * using a UUID as a parameter.
   * @param {string} empresaId - The `getCheckinsByEmpresa` function is an asynchronous function that
   * retrieves check-ins based on the `empresaId` provided. The `empresaId` parameter is expected to be
   * a string representing a UUID.
   * @returns The `getCheckinsByEmpresa` function is returning the result of calling a Supabase RPC
   * named 'get_checkins_with_user_status' with the provided `empresaId`. If there is an error during
   * the RPC call, it will log the error and return an object with the error details. Otherwise, it will
   * return the response from the RPC call.
   */
  async getCheckinsByEmpresa(empresaId: string) {
    // Não precisa de parseInt(), o UUID é passado como string
    return this.database.supabase
      .rpc('get_checkins_with_user_status', {
        // O parâmetro 'empresa_id_param' espera uma string UUID
        empresa_id_param: empresaId
      })
      .then((res) => {
        console.log('💻🔍🪲 - res', res);


        if (res.error) {
          console.error("Erro ao chamar RPC get_checkins_with_user_status:", res.error);
          return { error: res.error, message: res.error.message };
        }
        return res;
      });
  }

  /**
   * The function `deleteCheckinById` deletes a check-in record from a database based on the provided
   * check-in ID.
   * @param {string} checkinId - The `checkinId` parameter is a string that represents the unique
   * identifier of a check-in record in the `checkin_acesso` table of the Supabase database. This
   * `deleteCheckinById` function is designed to delete a check-in record from the database based on the
   * provided `
   * @returns The `deleteCheckinById` function is returning a Supabase query that deletes a check-in
   * record from the 'checkin_acesso' table based on the provided `checkinId`.
   */
  async deleteCheckinById(checkinId: string) {
    return await this.database.supabase
      .from('checkin_acesso')
      .delete()
      .eq('id', checkinId);
  }

  async getFrequencyByCPF(cpf: string) {
    return await this.database.supabase
      .from('checkin_acesso')
      .select('*')
      .eq('cpf_aluno', cpf)
      .order('data_hora', { ascending: false });
  }

}
