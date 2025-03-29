import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FinancasComponent } from './financas.component';
import { IonicModule } from '@ionic/angular';
import { FinancasRoutingModule } from './financas.routing';
import { MarkdownModule } from 'ngx-markdown';


import { FormTransacaoFinanceiraModule } from 'src/app/shared/form-transacao-finaceira/form-transacao-financeira.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AnaliseIaModalComponent } from './analise-ia-modal/analise-ia-modal/analise-ia-modal.component';

@NgModule({
  declarations: [FinancasComponent, AnaliseIaModalComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    FinancasRoutingModule,
    FormTransacaoFinanceiraModule,
    NgxChartsModule,
    MarkdownModule.forRoot(),
  ],
})
export class FinancasModule {}
