/* eslint-disable prettier/prettier */
import { Equipamento } from 'src/equipamento/equipamento.interface';
import { GrupoMuscular } from 'src/grupoMuscular/GrupoMuscular.interface';
import { Musculo } from 'src/musculo/Musculo.interface';

export interface Exercicio {
  id: number;
  nome: string;
  equipamento_id?: number;
  equipamento?: Equipamento;
  grupo_muscular_id?: number;
  grupo_muscular?: GrupoMuscular;
  musculo_id?: number;
  musculo?: Musculo;
  fl_ativo: boolean;
}

