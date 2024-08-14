import { FichaAlunoModule } from './ficha-usuario/ficha-aluno.module';
import { GrupoMuscularModule } from './grupoMuscular/grupo-muscular.module';
/* eslint-disable prettier/prettier */
import { TipoUsuarioModule } from './tipoUsuario/tipo-usuario.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsuarioModule } from './usuario/usuario.module';
import { HorarioModule } from './horario/horario.module';
import { PlanoModule } from './plano/plano.module';
import { MusculoModule } from './musculo/musculo.module';
import { EquipamentoModule } from './equipamento/equipamento.module';

import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { DataBaseModule } from './datasource/database.module';
import { TreinoModule } from './treino/treino.module';
import { ExercicioModule } from './exercicio/exercicio.module';
import { ParteDoCorpoModule } from './parte-do-corpo/parte-do-corpo.module';
@Module({
  imports: [
    FichaAlunoModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
      serveRoot: join(__dirname, '..', 'client'),
      renderPath: join(__dirname, 'public', 'index.html'),
    }),
    TipoUsuarioModule,
    AuthModule,
    UsuarioModule,
    TipoUsuarioModule,
    HorarioModule,
    PlanoModule,
    MusculoModule,
    EquipamentoModule,
    DataBaseModule,
    TreinoModule,
    ExercicioModule,
    GrupoMuscularModule,
    ParteDoCorpoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
