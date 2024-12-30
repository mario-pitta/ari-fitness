import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlanejadorPageRoutingModule } from './planejador-routing.module';

import { PlanejadorPage } from './planejador.page';
import { NgxEditorModule } from 'ngx-editor';
import { DragulaModule } from 'ng2-dragula';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    PlanejadorPageRoutingModule,
    NgxEditorModule,
    DragulaModule
  ],
  declarations: [PlanejadorPage]
})
export class PlanejadorPageModule {}
