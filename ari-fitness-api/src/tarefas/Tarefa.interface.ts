/* eslint-disable prettier/prettier */

export interface Tarefa {
  titulo: string;
  descricao: string;
  status: TarefaStatus;
  prioridade: number;
  data_limite_conclusao: Date;
  id: number;
  created_at: Date;
  criado_por: number;
  status_tarefa_id: number;
  tipo_tarefa_id: number;

}


export interface TarefaStatus {
  id: number;
  title: string;
  color: string;
}