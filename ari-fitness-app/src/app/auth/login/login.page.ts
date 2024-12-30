import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MaskitoOptions,
  MaskitoElementPredicate,
  maskitoTransform,
} from '@maskito/core';
import { Maskito } from '@maskito/core';
import Constants from 'src/core/Constants';
import { AuthService } from 'src/core/services/auth/auth.service';
const md5 = require('md5');
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  cpfMask = Constants.cpfMask
  form!: FormGroup
  maskPredicate: MaskitoElementPredicate = async (el) =>
    (el as HTMLIonInputElement).getInputElement();

  constructor(private fb: FormBuilder, private auth: AuthService) { }

  ngOnInit() {

    this.form = this.fb.group({
      cpf: ['', [Validators.required]],
      senha: ['', [Validators.required]],
    })
  }

  logar(){
    console.log('this.form.value.senha: ', this.form.value.senha);

    this.auth.login(this.form.value.cpf, md5(this.form.value.senha)).subscribe({
      next: user => {

        location.href = "/#/home";
        location.replace("/#/home");
        location.reload();
      }
    })
  }

}
