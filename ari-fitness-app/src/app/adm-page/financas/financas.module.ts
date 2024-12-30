import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FinancasComponent } from './financas.component';
import { IonicModule } from '@ionic/angular';
import { FinancasRoutingModule } from './financas.routing';
import { TransacaoFinanceiraFormModule } from 'src/app/shared/transacao-financeira-form/transacao-financeira-form.module';

@NgModule({
  declarations: [FinancasComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    FinancasRoutingModule,
    TransacaoFinanceiraFormModule
  ],
})
export class FinancasModule {}
