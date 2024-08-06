import { ParteDoCorpo } from "./ParteDoCorpo";

export interface GrupoMuscular {
  id: number;
  nome: string;
  created_at: string | Date;
  parte_do_corpo: ParteDoCorpo;
  parte_do_corpo_id: number;
}
