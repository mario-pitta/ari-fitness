
import { Equipamento } from './Equipamento';
import { GrupoMuscular } from './GrupoMuscular';
import { Musculo } from './Musculo';

export interface Exercicio {
  id: 9;
  created_at: string | Date;
  nome: string;
  fl_ativo: true;
  grupo_muscular_id?: number;
  grupo_muscular?: GrupoMuscular
  musculo_id?: number;
  musculo?: Musculo;
  equipamento_id?: number;
  equipamentos?: Equipamento;
}



