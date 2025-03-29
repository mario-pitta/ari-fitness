import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Usuario } from './Usuario';
import { CategoriaFinanceira } from 'src/app/shared/form-transacao-finaceira/form-transacao-finaceira.component';

export class TransacaoFinanceiraForm  {

  constructor(obj?: Partial<TransacaoFinanceira>) {
return new FormGroup({
      id:  new FormControl(obj?.id || null, [Validators.nullValidator]),
      descricao:  new FormControl(obj?.descricao || null, [Validators.nullValidator]),
      data_lancamento:  new FormControl(obj?.data_lancamento || null, [Validators.required]),
      valor_real:  new FormControl(obj?.valor_real || null, [Validators.nullValidator]),
      tr_tipo_id:  new FormControl(obj?.tr_tipo_id || null, [Validators.required]),
      tr_categoria_id:  new FormControl(obj?.tr_categoria_id || null, [Validators.required]),
      pago_por:  new FormControl(obj?.pago_por || null, [Validators.nullValidator]),
      recebido_por:  new FormControl(obj?.recebido_por || null, [Validators.required]),
      desconto:  new FormControl(obj?.desconto_perc ||obj?.desconto_real || null, [Validators.nullValidator]),
      desconto_perc:  new FormControl(obj?.desconto_perc || null, [Validators.nullValidator]),
      desconto_real:  new FormControl(obj?.desconto_real || null, [Validators.nullValidator]),
      valor_final:  new FormControl(obj?.valor_final || null, [Validators.required]),
      produto_id:  new FormControl(obj?.produto_id || null, [Validators.nullValidator]),
      servico_id:  new FormControl(obj?.servico_id || null, [Validators.nullValidator]),
      quantidade:  new FormControl(obj?.quantidade || null, [Validators.nullValidator] ),
      mes:  new FormControl(obj?.mes || null , [Validators.nullValidator]),
      ano:  new FormControl(obj?.ano || null , [Validators.nullValidator]),
      comprovante_url:  new FormControl(obj?.comprovante_url || null, [Validators.nullValidator]),
      membro:  new FormControl(obj?.membro || null, [Validators.nullValidator]),
      empresa_id:  new FormControl(obj?.empresa_id || null, [Validators.required]),
      forma_pagamento:  new FormControl(obj?.forma_pagamento || null, [Validators.required]),
      fl_pago:  new FormControl(obj?.fl_pago || true, [Validators.required]),
      auth_code:  new FormControl(obj?.auth_code || null, [Validators.nullValidator]),
    });
  }
}

export interface TransacaoFinanceira {
  categoria: CategoriaFinanceira;
  membro?: Usuario;
  id: number | FormControl<any> ;
  descricao: string | FormControl<any> ;
  data_lancamento: Date | FormControl<any> | string ;
  valor_real: number | FormControl<any> ;
  tr_tipo_id: number | FormControl<any>; //receita - despes a
  tr_categoria_id: number | FormControl<any>; // fixa, variavel, reparo, mensalidad e
  pago_por: number | FormControl<any>; //id do usuario que pagou - pode ser nul l
  recebido_por: number | FormControl<any>; //id do usuario que recebeu - não pode ser nul l
  desconto_perc: number | FormControl<any> ;
  desconto_real: number | FormControl<any> ;
  valor_final: number | FormControl<any> ;
  produto_id: number | FormControl<any>; // em caso de venda de produto s
  servico_id: number | FormControl<any>; // em caso de prestação de servic o
  quantidade: number | FormControl<any> ;
  mes: number | FormControl<any> ;
  ano: number | FormControl<any> ;
  comprovante_url: string | FormControl<any> ;
  empresa_id: string | FormControl<any>; //identificador da empres a
  forma_pagamento: FormaDePagamento | FormControl<any> ;
  fl_pago: boolean | FormControl<any> ;
  fl_ativo: boolean;
  auth_code: string | FormControl<any> ;
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
