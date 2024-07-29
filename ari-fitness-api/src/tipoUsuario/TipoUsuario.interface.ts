/* eslint-disable prettier/prettier */
export interface TipoUsuario {
  id?: number;
  created_at: Date | string;
  descricao: string;
  salario_padrao: number | string;
  adm_padrão: boolean;
}
