import { Component, inject, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-transacao-financeira-form',
  templateUrl: './transacao-financeira-form.component.html',
  styleUrls: ['./transacao-financeira-form.component.scss'],
})
export class TransacaoFinanceiraFormComponent implements OnInit {
save() {
throw new Error('Method not implemented.');
}
  @Input() tipo: string = 'receita';
  @Input() action: string = 'nova';
  categorias: { tipo: string; descricao: string }[] = [
    { tipo: 'receita', descricao: 'Mensalidade' },
    { tipo: 'receita', descricao: 'Diária' },
    { tipo: 'receita', descricao: 'Extra' },
    { tipo: 'receita', descricao: 'Aula Particular' },

    { tipo: 'receita', descricao: 'Outros' },
    { tipo: 'despesa', descricao: 'Fixa' },
    { tipo: 'despesa', descricao: 'Variável' },
    { tipo: 'despesa', descricao: 'Reparos' },
    { tipo: 'despesa', descricao: 'Salário' },
    { tipo: 'despesa', descricao: 'Aquisição' },
    { tipo: 'despesa', descricao: 'Combustível' },
    { tipo: 'despesa', descricao: 'Outros' },
  ];

  fb = inject(FormBuilder);
  transacaoForm: FormGroup = this.fb.group({});

  constructor() {}

  ngOnInit() {
    console.log(this.transacaoForm);
    console.log(this.categorias);
    console.log(this.action);
    console.log(this.tipo);
    this.createForm()
  }


  createForm(){
    this.transacaoForm =  this.fb.group({
      id: [null, Validators.nullValidator],
      descricao: [null, Validators.nullValidator],
      valor: [null, Validators.nullValidator],
      data: [new Date().toISOString().split('T')[0], Validators.nullValidator],
      mes: [null, Validators.nullValidator],
      ano: [null, Validators.nullValidator],
      desconto: [null, Validators.nullValidator],
      discountType: [null, Validators.nullValidator],
      valorPago: [null, Validators.nullValidator],
      formaPagamento: [null, Validators.nullValidator],
      comprovante: [null, Validators.nullValidator],
      status: [null, Validators.nullValidator],
      tipo: [this.tipo, Validators.nullValidator],
      created_at: [null, Validators.nullValidator],
      categoria: [null, Validators.nullValidator],
    });
  }
}
