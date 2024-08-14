// import { TreinoExercicioRelation } from './../../../../ari-fitness-api/src/treino/Treino.interface';
import { Exercicio } from './Exercicio';
import { GrupoMuscular } from './GrupoMuscular';
import { ParteDoCorpo } from './ParteDoCorpo';

export interface Treino {
  checked?: boolean;
  treino_exercicio?: any; //TreinoExercicioRelation;
  id: number;
  nome: string;
  exercicios: Exercicio[] | Partial<Exercicio>[];
  grupo_muscular_id?: number;
  grupo_muscular?: GrupoMuscular;
  parte_do_corpo_id?: number;
  parte_do_corpo?: ParteDoCorpo;
  descricao: string;
  carga: number;
  nivel_dificuldade: number;
}
