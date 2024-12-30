/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import { DataBaseService } from 'src/datasource/database.service';
import { Usuario } from '../usuario/Usuario.interface';

@Injectable()
export class DashboardService {
  constructor(private database: DataBaseService) {}

  getAllMembersDashboard(filters?: Partial<Usuario> | Usuario) {
    return this.database.supabase
      .from('usuario')
      .select(
        `*,
            plano: planos ( * ),
            horario: horarios ( * )
            `,
        { count: 'exact' },
      )
      .match({ ...filters })
      .then((res) => {
        if (res.error) return res;
        const genero = {
          male: 0,
          female: 0,
        };
        let memberAtLastMonth = 0;
        let newMembers = 0;
        let newMembersTendency = 0;
        const newMemberGender = {
          male: 0,
          female: 0,
        };
        const horarios = {} as any;

        res.data.forEach((user: Usuario) => {
          const dataCadastro = new Date(user.created_at);

          if (
            dataCadastro.getMonth() < new Date().getMonth() - 1 &&
            dataCadastro.getFullYear() <= new Date().getFullYear()
          )
            memberAtLastMonth++;
          if (user.genero === 'M') genero.male++;
          if (user.genero === 'F') genero.female++;
          if (dataCadastro.getMonth() == new Date().getMonth()) newMembers++;
          if (dataCadastro.getMonth() == new Date().getMonth() - 1)
            newMembersTendency++;
          if (
            user.genero === 'M' &&
            dataCadastro.getMonth() == new Date().getMonth()
          )
            newMemberGender.male++;
          if (
            user.genero === 'F' &&
            dataCadastro.getMonth() == new Date().getMonth()
          )
            newMemberGender.female++;

          const hora = user?.horario?.hora_inicio.slice(0, 5);
          if (!horarios[hora]) {
            horarios[hora] = 1;
          } else {
            horarios[hora]++;
          }
        });

        return {
          totalMembers: {
            male: genero.male,
            female: genero.female,
            total: res.count,
          },
          newMembers: {
            total: newMembers,
            tendency: newMembersTendency,
            male: newMemberGender.male,
            female: newMemberGender.female,
          },
          memberAtLastMonth,
          horarios,
        };
      });
  }
}
