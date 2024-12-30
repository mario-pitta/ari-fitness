import { IEmpresa } from "./Empresa";
import { FichaAluno } from "./FichaAluno";
import { Historico } from "./Historico";
import { Horario } from "./Horario";
import { Plano } from "./Plano";
import { Treino } from "./Treino";

export interface IUsuario {
  idade?: any;
  id?: number;
  created_at?: Date | string;
  nome: string;
  peso: number;
  altura: number;
  cpf: string;
  whatsapp: string;
  plano: number;
  planos: Plano;
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
  ficha_aluno?: FichaAluno[];
  historico?: Historico[]
  empresa_id?: string;
  empresa?: Partial<IEmpresa>
}
export class Usuario implements IUsuario{
  idade?: any;
  id?: number;
  created_at?: Date | string;
  nome!: string;
  peso!: number;
  altura!: number;
  cpf!: string;
  whatsapp!: string;
  plano!: number;
  planos!: Plano;
  horario_id!: number
  horarios!: Horario
  data_vencimento!: Date | string;
  senha!: string;
  fl_ativo!: boolean;
  foto_url!: string;
  avc!: boolean;
  dac!: boolean;
  diabete!: boolean;
  pressao_arterial!: string;
  cardiopata!: boolean;
  infarto!: boolean;
  genero!: string;
  fumante!: boolean;
  tipo_alimentacao!: string;
  tipo_usuario!: string | number;
  relato_dor!: boolean;
  medicacao_em_uso!: string;
  profissao!: string;
  fl_pratica_atividade_fisica!: boolean;
  objetivo!: string | number;
  data_nascimento!: Date | string;
  flagAdmin!: boolean;
  ficha_aluno?: FichaAluno[];
  historico?: Historico[];
  empresa_id?: string;
  empresa?: Partial<IEmpresa> | undefined;


  constructor(obj: IUsuario) {
    Object.assign(this, obj);
  }
}
