import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsuariosPageRoutingModule } from './usuarios-routing.module';

import { UsuariosPage } from './usuarios.page';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { TransacaoFinanceiraFormModule } from "../shared/transacao-financeira-form/transacao-financeira-form.module";
import { FormTransacaoFinanceiraModule } from '../shared/form-transacao-finaceira/form-transacao-financeira.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsuariosPageRoutingModule,
    NgxChartsModule,
    ReactiveFormsModule,
    FormTransacaoFinanceiraModule
],
  declarations: [UsuariosPage],
  exports: [UsuariosPage],
  schemas: []
})
export class UsuariosPageModule {}
