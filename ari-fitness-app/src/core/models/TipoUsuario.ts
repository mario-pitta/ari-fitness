export interface TipoUsuario {
  id?: number;
  created_at: Date | string;
  nome: string;
  salario_padrao: number | string;
  adm_padrao: boolean
}
