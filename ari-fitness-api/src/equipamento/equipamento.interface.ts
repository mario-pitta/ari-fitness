/* eslint-disable prettier/prettier */
export interface Equipamento {
  id: number,
  created_at: Date | string,
  nome: string,
  fl_ativo: boolean,
  foto_url?: string,
  categoria_id?: number,
  categoria?: Categoria
}


export interface Categoria {
  id: number,
  nome: string
  created_at: Date | string
}