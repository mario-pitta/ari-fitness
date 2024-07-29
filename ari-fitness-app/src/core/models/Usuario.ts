import { Horario } from "./Horario";

export interface Usuario {
  idade?: any;
  id?: number;
  created_at?: Date | string;
  nome: string;
  peso: number;
  altura: number;
  cpf: string;
  whatsapp: string;
  plano: number;
  horario_id: number
  horarios: Horario
  data_vencimento: Date | string;
  senha: string;
  fl_ativo: boolean;
  foto_url: string;
  avc: boolean;
  dac: boolean;
  diabete: boolean;
  pressao_arterial: string;
  cardiopata: boolean;
  infarto: boolean;
  genero: string;
  fumante: boolean;
  tipo_alimentacao: string;
  tipo_usuario: string | number;
  relato_dor: boolean;
  medicacao_em_uso: string;
  profissao: string;
  fl_pratica_atividade_fisica: boolean;
  objetivo: string | number;
  data_nascimento: Date | string;
  flagAdmin: boolean;
}
