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
    localStorage.clear();
    this.form = this.fb.group({
      cpf: ['', [Validators.required]],
      dataNascimento: ['', [Validators.required]],
    })
  }

  logar(){
    this.auth.login(this.form.value.cpf, this.form.value.dataNascimento).subscribe({
      next: user => {
        localStorage.setItem('user', JSON.stringify(user));
        location.href = "/#/home";
      }
    })
  }

}
