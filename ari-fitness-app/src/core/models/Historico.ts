import { Exercicio } from "./Exercicio";
import { Treino } from "./Treino";
import { Usuario } from "./Usuario";

export interface Historico {
  id?: number;

  aluno: Usuario;
  treino: Treino;
  exercicio: Exercicio;
  series: number;
  repeticao: number;
  carga: number;
  intervalo: number;

  nivel_dificuldade: number;
  data: Date | string;

}
