/* eslint-disable prettier/prettier */

export interface Empresa {
  id?: string;
  created_at?: Date;
  nome_fantasia?: string;
  cnpj?: string;
  logo_url?: string;
  banner_url?: string;
  flag_ativo?: boolean;
  subscription_plan_id?: number //fk SUBCRITION_PAN;
  default_theme?: string;
  nome?: string;
  telefone?: string;
  email?: string;
  primary_color_hex?: string;
  accept_pix?: string;
  accept_credit_card?: string;
  accept_debit_card?: string;
  accept_money_in_cash?: string;


  enderecos?: Endereco[];
  horarios?: Horario[];
  planos?: Plano[];
  updated_at?: Date;
  deleted_at?: Date;
  

  
  pgmto_credito_max_parcelas?: string;
  chave_pix?: string;
  openai_key?: string;
  meta_key?: string;
}

export interface Endereco {
  id: number;
  descricao: string;
  cep?: string;
  logradouro?: string;
  numero?: string;
  complemento?: string;
  bairro?: string;
  cidade?: string;
  estado?: string;
}

export interface Horario {
  id?: number;
  created_at: Date;
  hora_inicio: string;
  hora_fim: string;
  fl_ativo: boolean;
  empresa_id?: Empresa['id'];
}

export interface Plano {
  id?: number;
  created_at: Date;
  nome: string;
  valor: number;
  fl_ativo: boolean;
  empresa_id?: Empresa['id'];
}
