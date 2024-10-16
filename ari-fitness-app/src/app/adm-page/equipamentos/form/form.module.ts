import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EquipamentoFormRoutingModule } from './form-routing.module';

import { EquipamentoFormPage } from './form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    EquipamentoFormRoutingModule
  ],
  declarations: [EquipamentoFormPage]
})
export class AdminEquipamentoFormModule {}
