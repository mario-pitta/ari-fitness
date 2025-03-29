/* eslint-disable prettier/prettier */
/*
https://docs.nestjs.com/providers#services
*/

import { GoogleGenerativeAI } from '@google/generative-ai';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Empresa } from 'src/empresa/empresa.interface';
import { EmpresaService } from 'src/empresa/empresa.service';
import { Equipamento } from 'src/equipamento/equipamento.interface';
import { EquipamentoService } from 'src/equipamento/equipamento.service';
import { ExercicioService } from 'src/exercicio/exercicio.service';
import { TransacaoFinanceiraService } from 'src/transacao_financeira/transacao-financeira.service';
import { TransacaoFinanceira } from 'src/transacao_financeira/TransacaoFinanceira.interface';
import { TreinoExercicioRelation } from 'src/treino/Treino.interface';
import { Exercicio } from './../exercicio/exercicio.interface';
import { UsuarioService } from 'src/usuario/usuario.service';
import { FichaAlunoService } from 'src/ficha-usuario/ficha-aluno.service';

@Injectable()
export class GeminiService {
  gen: GoogleGenerativeAI;
  model: any;
  constructor(
    private empresaService: EmpresaService,
    private transacaoFinanceira: TransacaoFinanceiraService,
    private usuarioService: UsuarioService,
    private equipamentoService: EquipamentoService,
    private exercicioService: ExercicioService,
    private fichaService: FichaAlunoService,
  ) {
    this.createGen();
  }

  async getFinanceReport(
    empresa: Empresa,
    filters: Partial<TransacaoFinanceira> | any,
  ) {
    const transacoes: any = await this.transacaoFinanceira.findAll({
      empresa_id: empresa.id,
      data_inicio: filters.data_inicio,
      data_fim: filters.data_fim,
      orderBy: 'data_lancamento',
      asc: true,
    });

    if (transacoes.error) throw new Error(transacoes.error);

    const prompt = `
    Você é um especialista sênior em gestão estratégica de academias e um matemático rigoroso, 
    com vasta experiência em análise financeira detalhada. Sua missão é analisar um conjunto de dados financeiros de
    uma academia, identificar precisamente problemas e suas causas subjacentes, e propor melhorias concretas e mensuráveis, 
    com foco absoluto em otimizar receitas e controlar despesas, garantindo a sustentabilidade financeira.

    Instruções:

    1. Análise Financeira Detalhada:
        - Examine cada transação financeira fornecida, classificando-as inequivocamente como receita ou despesa,
        calcule o valor exato de cada tipo de transação categorizando-as por categoria.
        - Calcule o valor exato total de "dinheiro deixado na mesa" resultante de todos os descontos aplicados nas receitas e 
        demonstre o valor total de descontos e a listagem dos principais descontos com motivo e beneficiário (se disponível).
        - NÂO utilize tabelas, gráficos ou diagramas para apresentar as informações. Priorize a apresentação em listas e textos.
        - NÃO é nessário listar todas as transações, apenas os principais.
        - Descreva sua visão crítica do conjunto de dados, destacando os principais problemas e suas causas subjacentes.
        

    2. Identificação de Problemas e Causas:
        - Identifique os principais problemas financeiros da academia.
        - Analise as causas primárias desses problemas.
        - Atribua uma probabilidade percentual de certeza para cada problema (soma deve ser 100%).
        - Atribua uma probabilidade percentual de certeza para cada causa (soma deve ser 100%).
        - Elabore um plano bem estruturado e conciso para resolver os problemas e causas, com base nas suas probabilidades de certeza.

    3. Propostas de Melhorias:
        - Desenvolva sugestões de melhorias específicas e mensuráveis para otimizar receitas.
        - Proponha medidas concretas para controlar e reduzir despesas.
        - Atribua uma probabilidade percentual de certeza para cada melhoria (soma deve ser 100%).
        - Elabore um plano bem estruturado e conciso para implementar as melhorias, com base nas suas probabilidades de certeza.

    4. Relatório Detalhado (Formato Markdown Estrito):
        - Gere um relatório completo em formato Markdown, com os seguintes tópicos:
        - Visão geral das finanças da academia.
        - Calculo EXATO de receitas e despesas, LEVANDO EM CONSIDERAÇÃO o valor total de descontos.
        - Listagem dos descontos principais com motivo, valor, percentual, motivação e beneficiário (se disponível).
        - Identificação de problemas e suas probabilidades.
        - Causas dos problemas e suas probabilidades.
        - Propostas de melhorias e suas probabilidades.
        - Visão Crítica do conjunto de dados, destacando os principais problemas e suas causas subjacentes e sugestões de planejamento para solucionar-os.

    5. Formato de Saída (JSON EXATO):

    A resposta DEVE ser um objeto JSON válido, formatado **EXATAMENTE** da seguinte maneira, sem nenhuma formatação adicional, caracteres extras ou desvios:

    \`\`\`json
    {
      "report": "string", // Relatório detalhado em formato Markdown com os tópicos mencionados, SEM incluir nenhum bloco JSON dentro desta string.
      "data": {
        "receitas": number,
        "despesas": number,
        "fluxoDeCaixa": number,
        "problemas": [
          {
            "name": "string",
            "probabilidade": number // (em porcentagem, a soma dos valores deve ser 100)
          }
          // ... mais problemas
        ],
        "causas": [
          {
            "name": "string",
            "probabilidade": number // (em porcentagem, a soma dos valores deve ser 100)
          }
          // ... mais causas
        ],
        "melhorias": [
          {
            "name": "string",
            "probabilidade": number // (em porcentagem, a soma dos valores deve ser 100)
          }
          // ... mais melhorias
        ],
        "chartData": {
          "name": "string", // Ex: "Receitas vs Despesas"
          "type": "string", // "bar", "pizza", "line", "pie"
          "series": [
            {
              "name": "string", // Ex: "Mensalidades"
              "value": number
            }
            // ... mais séries
          ]
        }
      },
      "orientacoes": "string" // SEM formatação Markdown, apenas texto, quando houver orientações.
      "html": "string" // documento HTML para impressão com estilização básica mas contendo todo o conteudo do relatorio e as orientacoes, o texto sempre deve ser preto e o maior titulo será h4
    }
    \`\`\`

    - Orientações de formatação CRÍTICAS:
        - A resposta DEVE ser um objeto JSON válido e corresponder **INTEIRAMENTE** à estrutura exata fornecida acima.
        - Utilize **APENAS** o formato Markdown para o conteúdo da propriedade "report".
        - Pule duas linhas vazias no relatório para separar os tópicos e antes de cada tópicos de cada um dos títulos e subtítulos do relatório, separando-os do conteudo do tópico anterior.
        - As probabilidades em "problemas", "causas" e "melhorias" devem ser números inteiros representando porcentagens, e a soma dos valores em cada array deve ser **EXATAMENTE 100**.
        - A propriedade "chartData" deve conter um objeto com as propriedades "name", "type" e um array de "series". Inclua pelo menos um gráfico relevante (ex: comparação de receitas e despesas).
        - A propriedade "orientacoes" deve ser uma string de texto simples, sem qualquer formatação Markdown.
        - **NÃO inclua nenhum caractere extra, espaço em branco desnecessário fora das strings, ou qualquer outra formatação que não esteja estritamente definida no formato de saída.**

    Observações:

    - O objetivo é fornecer um relatório financeiro completo e acionável.
    - Demonstre precisão em cálculos e análises.
    - Seja claro e abrangente na linguagem do relatório.
    - Assegure-se de que a estrutura do JSON de saída corresponda PERFEITAMENTE ao formato especificado.
    - Caso haja orientações sobre implementação ou utilização do sistema, oriente o usuário sobre o uso do MvK Gym Manager, que é o sistema de gestão de academias que o cliente possui.

    Dados da Empresa:
    ${JSON.stringify(empresa)}

    Dados Financeiros:
    ${JSON.stringify(transacoes)}
    `;

    return await this.runPrompt(prompt);
  }

  async runPrompt(prompt: string) {
    const result = await this.model.generateContent({
      model: 'gemini-1.5-flash',

      contents: [
        {
          parts: [
            {
              text: prompt,
            },
          ],
        },
      ],
    });

    const response = await result.response;

    let text = response.text();

    // Limpeza da string para torná-la um JSON válido
    text = text.replace(/`json?/g, ''); // Remove blocos de código JSON
    text = text.replace(/`/g, ''); // Remove aspas simples soltas

    console.log('Texto ANTES do parse JSON (limpo):', text);

    try {
      const json = JSON.parse(JSON.parse(JSON.stringify(text)));
      return json;
    } catch (error) {
      console.error('Erro ao analisar JSON:', error);
      throw new HttpException(
        'Erro ao formatar resposta da IA',
        HttpStatus.INTERNAL_SERVER_ERROR,
        { cause: error },
      );
    }
  }

  async buildTreinoDoAluno(alunoId: string | number, empresaId: string) {
    console.log('chegou no geminiService: ', alunoId, empresaId);
    const _aluno = await this.usuarioService.findByFilters({
      id: Number(alunoId),
    });

    if (_aluno.error)
      throw new HttpException('Aluno não encontrado', HttpStatus.NOT_FOUND, {
        cause: new Error(_aluno.error.message),
      });

    const aluno = _aluno.data[0];

    if (!aluno)
      throw new HttpException('Aluno não encontrado', HttpStatus.NOT_FOUND, {
        cause: new Error('Aluno nao encontrado'),
      });

    if (aluno.empresa_id !== empresaId)
      throw new HttpException(
        'Aluno nao pertence a empresa',
        HttpStatus.NOT_ACCEPTABLE,
        {
          cause: new Error('Aluno nao pertence a empresa'),
        },
      );

    const equipamentos: any | Equipamento[] =
      await this.equipamentoService.findAll({
        empresa_id: empresaId,
        fl_ativo: true,
      });
    if (equipamentos.error) {
      throw new Error(equipamentos.error.message);
    }

    const exercicios = await this.exercicioService.findAll({
      empresa_id: empresaId,
      fl_ativo: true,
    });
    if (exercicios.error) {
      throw new Error(exercicios.error.message);
    }

    const treinos = await this.fichaService.getByUser(aluno.id, {});

    const prompt = `
        "Você é um instrutor de academia altamente qualificado, especializado em desempenho físico e saúde. Seu objetivo é criar fichas de treino personalizadas, levando em conta as necessidades individuais de cada aluno e otimizando o uso dos equipamentos disponíveis. O plano deve seguir princípios de segurança, eficiência e progressão adequada. Considere os seguintes fatores ao elaborar o treino:"

        📌 Dados do Aluno:

        ${JSON.stringify(aluno)}

        🏋️ Equipamentos Disponíveis na Academia:
        ${JSON.stringify(
          equipamentos.data.map((eq: Equipamento) => ({
            id: eq.id,
            nome: eq.nome,
            categoria: eq.categoria,
          })),
        )}


        🔄 Lista de Exercícios Disponíveis:
        ${JSON.stringify(
          exercicios.data.map((eq: Exercicio) => ({
            id: eq.id,
            nome: eq.nome,
            equipamento: {
              id: eq.equipamento?.id,
            },
          })),
        )}


        Treinos Anteriores:
        ${JSON.stringify(
          treinos?.data?.map((tr) => {
            return tr.treinos_cadastrados?.map((_tr: any) => {
              return {
                id: _tr.treino.id,

                exercicios: _tr.treino.exercicios?.map(
                  (ex: TreinoExercicioRelation | any) => {
                    return {
                      id: ex.id,
                      exercicio_id: ex.exercicio.id,
                      equipamento_id: ex.equipamento?.id,
                      nome: ex.exercicio.nome,
                      equipamento: ex.equipamento,
                    };
                  },
                ),
              };
            });
          }),
        )}

        📑 Requisitos para a Ficha de Treino:


        Divisão do treino → Exemplo: ABC, Full Body, Push/Pull/Legs, Upper/Lower, etc.

        Exercícios selecionados para cada dia → Baseados nos equipamentos disponíveis e no objetivo do aluno.

        Carga sugerida para cada exercício → Baseada na intensidade do exercício e na capacidade do aluno.

        Resumo dos treinos anteriores, destaque nos avanços e dificuldades → Informações importantes para ajudar na compreensão do aluno.

        Número de séries e repetições → Respeitando princípios como carga progressiva e intensidade adequada.

        Tempo de descanso entre as séries → Definido de acordo com o objetivo (força, resistência, hipertrofia, etc.).

        Observações e ajustes personalizados → Considerar limitações, postura, execução e sugestões para progressão segura.

        Formato de Saída:

        {
            "ficha": string // Ficha de treino em formato Markdown com os tópicos mencionados.;
            "data": {
                "aluno": {
                    "nome": string;
                    "objetivo": string;
                    "idade": number;
                    "peso": number;
                    "altura": number;
                    "genero": string;
                };
                "treinos": {
                    id?: number;
                    nome: string;
                    descricao: string;
                    exercicios?: {
                        id: number;
                        exercicio: {
                            id: number;
                            nome: string
                        }
                        equipamento:  {
                            id: number;
                            nome: string
                        }
                        series: number;
                        repeticoes: number;
                        intervalo: number;
                        carga: number;
                    }[];
                    nivel_dificuldade: number;
                    fl_ativo: boolean;
                    fl_publico: boolean;
                    grupo_muscular_id: number;
                    grupo_muscular?: GrupoMuscular;
                    parte_do_corpo_id: number;
                    parte_do_corpo?: ParteDoCorpo;
                }[]
            }
        }

        *   Formate a resposta como um objeto JSON válido, sem nenhuma marcação adicional.
        *   Certifique-se de que a resposta seja um objeto com as chaves "ficha" e "data".
        *   Certifique-se de que as chaves "aluno", "treinos" e "data" sejam objetos.
        *   Certifique-se que o "ficha" seja uma string no formato Markdown sem pular linhas e entre crases. 


        ⚠️ Diretrizes Importantes:
        ✅ Evite exercícios que possam agravar lesões ou restrições do aluno.
        ✅ Priorize equilíbrio muscular e desenvolvimento global para evitar descompensações.
        ✅ Adapte a intensidade e carga conforme a experiência do aluno.
        ✅ Se necessário, forneça variações alternativas para exercícios mais complexos.
        ✅ Leve em consideração os treinos anteriores do aluno para ajustar a carga e o nível de dificuldade para que ele se sinta confortável e tenha resultados satisfatórios e seguros.
        ✅ Inclua progressões semanais ou ajustes conforme o aluno evolui.

        Elabore um plano eficiente, bem distribuído e realista, garantindo que o aluno tenha resultados sem comprometer a segurança e a motivação.

    `;

    return await this.runPrompt(prompt);
  }

  async createGen() {
    this.gen = await new GoogleGenerativeAI(
      process.env.GOOGLE_GEMINI_KEY as string,
    );
    this.setModel('gemini-1.5-flash');
  }

  async setModel(model: string) {
    this.model = await this.gen.getGenerativeModel({ model: model });
  }

  async getGen() {
    return this.gen;
  }
}
