/* eslint-disable prettier/prettier */

export interface TransacaoFinanceira {
  categoria_transacao_financeira?: any;
  id: number;
  descricao: string;
  data_lancamento: Date | string;
  valor_real: number;
  tr_tipo_id: number; //receita - despesa
  tr_categoria_id: number; // fixa, variavel, reparo, mensalidade
  pago_por: number; //id do usuario que pagou - pode ser null
  recebido_por: number; //id do usuario que recebeu - não pode ser null
  desconto_perc: number;
  desconto_real: number ;
  valor_final: number;
  produto_id: number; // em caso de venda de produtos
  servico_id: number; // em caso de prestação de servico
  quantidade: number;
  mes: number;
  ano: number;
  comprovante_url: string;
  empresa_id: string; //identificador da empresa
  forma_pagamento: FormaDePagamento
  fl_pago: boolean;
}

export enum TipoDeTransacao {
  RECEITA = 1,
  DESPESA = 2,
}




export enum FormaDePagamento {
  PIX = 'pix',
  DINHEIRO = 'dinheiro',
  TRANSFERENCIA = 'transferencia',
  BOLETO = 'boleto',
  CARTAO_CREDITO = 'cartao_credito',
  CARTAO_DEBITO = 'cartao_debito',
}