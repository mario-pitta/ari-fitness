/* eslint-disable prettier/prettier */
export interface IEvento {
    id: number;
    created_at: string;
    criado_por: number;
    data_inicio: string;
    hora_inicio: string;
    data_fim: string;
    hora_fim: string;
    titulo: string;
    descricao: string;
    fl_ativo: boolean;
    local: string;
    tipo_evento_id: number;
    fl_publico: boolean;
    status_evento_id: number;
    banner: string;
    empresa_id: string;
  }