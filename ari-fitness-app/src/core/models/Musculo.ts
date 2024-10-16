import { GrupoMuscular } from "./GrupoMuscular";
import { ParteDoCorpo } from "./ParteDoCorpo";

export interface Musculo {
  id: number;
  nome: string;
  funcao: string;
  created_at: string | Date;
  grupo_muscular: GrupoMuscular;
  parte_do_corpo: ParteDoCorpo;
  grupo_muscular_id: 1;
  parte_do_corpo_id: 1;
  principais_exercicios: string;
  fl_ativo: boolean;
}
