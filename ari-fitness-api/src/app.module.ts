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
import { join } from 'path'
@Module({
  imports: [
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
    EquipamentoModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
