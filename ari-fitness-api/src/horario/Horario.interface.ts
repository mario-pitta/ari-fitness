/* eslint-disable prettier/prettier */
const timeMask = "/\d/\d:/\d/\d"

export interface Horario {
  id: number;
  hora_inicio: string | typeof timeMask;
  hora_fim: string | typeof timeMask;
  fl_ativo: boolean
}
