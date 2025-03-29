import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InstrutoresPageRoutingModule } from './instrutores-routing.module';

import { InstrutoresPage } from './instrutores.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InstrutoresPageRoutingModule
  ],
  declarations: [InstrutoresPage]
})
export class InstrutoresPageModule {}
