import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PessoaFormPageRoutingModule } from './pessoa-form-routing.module';

import { PessoaFormPage } from './pessoa-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    PessoaFormPageRoutingModule
  ],
  declarations: [PessoaFormPage],
  exports: [PessoaFormPage]
})
export class PessoaFormPageModule {}
