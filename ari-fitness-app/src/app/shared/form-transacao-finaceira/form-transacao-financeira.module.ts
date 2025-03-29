import { NgModule } from "@angular/core";
import { FormTransacaoFinaceiraComponent } from "./form-transacao-finaceira.component";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    FormTransacaoFinaceiraComponent
  ],
  declarations: [
    FormTransacaoFinaceiraComponent
  ],
  providers: []
})
export class FormTransacaoFinanceiraModule {}
