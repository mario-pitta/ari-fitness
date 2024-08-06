/* eslint-disable prettier/prettier */
import { Equipamento } from 'src/equipamento/equipamento.interface';
import { Exercicio } from 'src/exercicio/exercicio.interface';
import { GrupoMuscular } from 'src/grupoMuscular/GrupoMuscular.interface';
import { ParteDoCorpo } from 'src/parte-do-corpo/parte-do-corpo.interface';

export interface Treino {
  id?: number;
  nome: string;
  descricao: string;
  exercicios?: TreinoExercicioRelation[] | Partial<TreinoExercicioRelation>[];
  nivel_dificuldade: number;
  fl_ativo: boolean;
  fl_publico: boolean;
  grupo_muscular_id: number;
  grupo_muscular?: GrupoMuscular;
  parte_do_corpo_id: number;
  parte_do_corpo?: ParteDoCorpo;
  cadastrado_por: number;
  carga: number;
}

export interface TreinoExercicioRelation {
  exercicios?: any;
  id: null;
  exercicio: Exercicio
  equipamento:  Equipamento
  series: number;
  repeticoes: number;
  intervalo: number;
  carga: number;
}
