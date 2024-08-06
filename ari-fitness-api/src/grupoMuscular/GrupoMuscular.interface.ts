import { ParteDoCorpo } from 'src/parte-do-corpo/parte-do-corpo.interface';

export interface GrupoMuscular {
  id: number;
  nome: string;
  created_at: string | Date;
  parte_do_corpo: ParteDoCorpo;
  parte_do_corpo_id: number;
}
