import { Maskito, MASKITO_DEFAULT_OPTIONS } from '@maskito/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PessoaFormPageRoutingModule } from './pessoa-form-routing.module';

import { PessoaFormPage } from './pessoa-form.page';
import { MaskitoDirective } from '@maskito/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    PessoaFormPageRoutingModule,
    MaskitoDirective
  ],
  declarations: [PessoaFormPage],
  exports: [PessoaFormPage]
})
export class PessoaFormPageModule {}
