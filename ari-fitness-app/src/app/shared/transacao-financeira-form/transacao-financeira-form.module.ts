import { NgModule } from "@angular/core";
import { TransacaoFinanceiraFormComponent } from "./transacao-financeira-form.component";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { ReactiveFormsModule } from "@angular/forms";
import { FilterCategoriaPorTipoPipe } from "./filterCategoriaPorTipo.pipe";

@NgModule({
  imports: [CommonModule, IonicModule, ReactiveFormsModule, ],
  declarations: [TransacaoFinanceiraFormComponent, FilterCategoriaPorTipoPipe],
  exports: [TransacaoFinanceiraFormComponent],
})
export class TransacaoFinanceiraFormModule {}
