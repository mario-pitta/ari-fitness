export interface SubscritptionPlan {
  id?: number;
  descricao?: string;
  fl_ativo?: boolean;
  created_at?: Date;
  qtd_dias_semana?: number;
  preco_padrao?: number;
  caracteristicas?: string;
}
