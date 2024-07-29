import { Time } from "@angular/common";
import { IonDatetime } from "@ionic/angular";

const timeMask = "/\d/\d:/\d/\d"

export interface Horario {
  id: number;
  created_at: Date;
  hora_inicio: string | typeof timeMask;
  hora_fim: string | typeof timeMask;
  fl_ativo: boolean
}
