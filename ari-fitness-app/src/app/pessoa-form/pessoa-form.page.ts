import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-pessoa-form',
  templateUrl: './pessoa-form.page.html',
  styleUrls: ['./pessoa-form.page.scss'],
})
export class PessoaFormPage implements OnInit {
  onFormChange($event: Event) {
    console.log($event);
    console.log(this.form)
  }
  form: FormGroup = new FormGroup({});
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.createForm();
  }

  createForm() {
    return this.fb.group({
      id: [null, [Validators.nullValidator]],
      nome: [{value: "", disabled: false,type: "text"}, [Validators.required]],
      dataNascimento: [null, [Validators.required]],
      tipoUsuario: ['', [Validators.required]],
      genero: ['', [Validators.required]],
      peso: ['', [Validators.required]],
      altura: ['', [Validators.required]],
      cpf: ['', [Validators.required]],
      plano: ['', [Validators.required]],
      horario: ['', [Validators.required]],
      whatsapp: ['', [Validators.required]],
      flagAdmin: [false, [Validators.required]],
    });
  }

  onChangeTipoUser(){
    if(this.form.value.tipoUsuario !== 2){
      this.form.patchValue({
        flagAdmin: false
      })
    }
  }


}
