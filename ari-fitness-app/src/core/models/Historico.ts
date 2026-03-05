import { Exercicio } from "./Exercicio";
import { Treino } from "./Treino";
import { IUsuario } from "./Usuario";

export interface Historico {
  id?: number;

  aluno: IUsuario;
  treino: Treino;
  exercicio: Exercicio;
  series: number;
  repeticao: number;
  carga: number;
  intervalo: number;

  nivel_dificuldade: number;
  data: Date | string;

}
