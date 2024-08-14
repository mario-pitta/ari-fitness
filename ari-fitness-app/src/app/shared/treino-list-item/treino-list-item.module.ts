import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreinoListItemComponent } from './treino-list-item.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ReactiveFormsModule],
  declarations: [TreinoListItemComponent],
  exports: [TreinoListItemComponent],
})
export class TreinoListItemModule {}
