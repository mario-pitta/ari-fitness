import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { forkJoin, throwError } from 'rxjs';
import {
  MaskitoOptions,
  MaskitoElementPredicate,
  maskitoTransform,
} from '@maskito/core';
import { Maskito } from '@maskito/core';

import Constants from 'src/core/Constants';

import { Usuario } from 'src/core/models/Usuario';
import { TipoUsuario } from 'src/core/models/TipoUsuario';
import { Horario } from 'src/core/models/Horario';
import { Plano } from 'src/core/models/Plano';

import { TipoUsuarioService } from 'src/core/services/tipoUsuario/tipoUsuario.service';
import { PlanoService } from 'src/core/services/plano/plano.service';
import { HorarioService } from 'src/core/services/horario/horario.service';
import { UsuarioService } from 'src/core/services/usuario/usuario.service';
import { ToastrService } from 'src/core/services/toastr/toastr.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pessoa-form',
  templateUrl: './pessoa-form.page.html',
  styleUrls: ['./pessoa-form.page.scss'],
})
export class PessoaFormPage implements OnInit {
  loading: boolean = false;

  phoneMask: MaskitoOptions = {
    mask: [
      '(',
      /\d/,
      /\d/,
      ')',
      ' ',
      /\d/,
      ' ',
      /\d/,
      /\d/,
      /\d/,
      /\d/,
      '-',
      /\d/,
      /\d/,
      /\d/,
      /\d/,
    ],
  };
  cpfMask: MaskitoOptions = {
    mask: [
      /\d/,
      /\d/,
      /\d/,
      '.',
      /\d/,
      /\d/,
      /\d/,
      '.',
      /\d/,
      /\d/,
      /\d/,
      '-',
      /\d/,
      /\d/,
    ],
  };
  alturaMask: MaskitoOptions = {
    mask: [/\d/, '.', /\d/, /\d/],
  };
  pesoMask: MaskitoOptions = {
    mask: [/\d/, /\d/, '.', /\d/, /\d/],
  };

  tipoUsuarioList: TipoUsuario[] = [];
  maskPredicate: MaskitoElementPredicate = async (el) =>
    (el as HTMLIonInputElement).getInputElement();
  planos: Plano[] = [];
  horarios: Horario[] = [];

  onFormChange($event: Event) {
    console.log($event);
    console.log(this.form);
  }
  form: FormGroup = new FormGroup({});
  // temDoenca: boolean = false;
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private usuarioService: UsuarioService,
    private tipoUsuarioService: TipoUsuarioService,
    private planoService: PlanoService,
    private horarioService: HorarioService,
    private aRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    console.log(
      'this.aRoute.snapshot.params["id"] : ',
      this.aRoute.snapshot.params['id']
    );
    this.createForm();
    this.loadData();
  }

  loadData() {
    forkJoin([
      this.getTipoUsuarioList(),
      this.getActiveHorarios(),
      this.getActivePlans(),
    ]).subscribe({
      next: (result) => {
        console.log('tipoUsuario, horarios, planos: ', result);
      },
      error: (err) => {
        this.loading = false;

        throwError(err);
      },
    });
  }

  getActivePlans() {
    return this.planoService.findByFilters({ fl_ativo: true }).subscribe({
      next: (planos: Plano[]) => {
        this.planos = planos;
      },
      error: (err) => {
        this.loading = false;

        console.error(err);
        throwError(err);
      },
    });
  }

  getActiveHorarios() {
    return this.horarioService.findByFilters({ fl_ativo: true }).subscribe({
      next: (horarios: Horario[]) => {
        this.horarios = horarios;
      },
      error: (err) => {
        this.loading = false;

        console.error(err);
        throwError(err);
      },
    });
  }

  getTipoUsuarioList() {
    this.loading = true;
    return this.tipoUsuarioService.findAll().subscribe({
      next: (res: TipoUsuario[]) => {
        if (res) this.tipoUsuarioList = res;
      },
      error: (err) => {
        this.loading = false;

        throwError(err);
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  imcIdeal = 0;
  rcqIdeal: number = 0;
  calcIMC() {
    console.log(
      'calculando imc ideal',
      Number(this.form.value.peso),
      Number(this.form.value.altura)
    );
    this.imcIdeal =
      Number(this.form.value.peso) /
      Math.pow(Number(this.form.value.altura), 2);
    this.imcIdeal = Number(this.imcIdeal.toFixed(2));
    console.log(this.imcIdeal);
  }
  calcRCQ() {
    console.log('calculando rcq ideal');
    this.imcIdeal = Number(
      (this.form.value.peso / Math.pow(this.form.value.peso, 2)).toFixed(2)
    );
    console.log(this.imcIdeal);
  }

  createForm() {
    this.form = this.fb.group({
      id: [null, [Validators.nullValidator]],
      nome: ['', [Validators.required]],
      data_nascimento: null,
      tipo_usuario: [
        Number(this.aRoute.snapshot.params['id']),
        [Validators.required],
      ],
      genero: ['', [Validators.required]],
      peso: [
        null,
        [
          Number(this.aRoute.snapshot.params['id']) == Constants.ALUNO_ID
            ? Validators.required
            : Validators.nullValidator,
        ],
      ],
      altura: [
        null,
        [
          Number(this.aRoute.snapshot.params['id']) == Constants.ALUNO_ID
            ? Validators.required
            : Validators.nullValidator,
        ],
      ],
      cpf: [null, [Validators.required]],
      plano: [
        null,
        [
          Number(this.aRoute.snapshot.params['id']) == Constants.ALUNO_ID
            ? Validators.required
            : Validators.nullValidator,
        ],
      ],
      horario_id: [
        null,
        [
          Number(this.aRoute.snapshot.params['id']) == Constants.ALUNO_ID
            ? Validators.required
            : Validators.nullValidator,
        ],
      ],
      whatsapp: ['', [Validators.required]],
      doencas: ['', [Validators.nullValidator]],
      objetivo: [null, [Validators.nullValidator]],
      tipo_alimentacao: [null, [Validators.nullValidator]],
      senha: [null, [Validators.nullValidator]],
      rcq: [null, [Validators.nullValidator]],
      imc: [null, [Validators.nullValidator]],
      flagAdmin: [false, [Validators.required]],
      fl_ativo: [true, [Validators.required]],
      foto_url: ['', [Validators.nullValidator]],
      avc: [false, [Validators.required]],
      dac: [false, [Validators.required]],
      diabete: [false, [Validators.required]],
      pressao_arterial: [false, [Validators.required]],
      cardiopata: [false, [Validators.required]],
      infarto: [false, [Validators.required]],
      fumante: [false, [Validators.required]],
      relato_dor: [false, [Validators.required]],
      medicacao_em_uso: [false, [Validators.required]],
      profissao: [false, [Validators.required]],
      fl_pratica_atividade_fisica: [false, [Validators.required]],
      data_vencimento: [
        null,
        [
          Number(this.aRoute.snapshot.params['id']) == Constants.ALUNO_ID
            ? Validators.required
            : Validators.nullValidator,
        ],
      ],
      created_at: [null, [Validators.nullValidator]],
      classificacao_risco: [1, [Validators.nullValidator]],
      observacoes: ['', [Validators.nullValidator]],
    });
  }

  customCounterFormatter(inputLength: number, maxLength: number) {
    return `${maxLength - inputLength} characters remaining`;
  }

  onChangeTipoUser() {
    const newValue = this.form.value.tipo_usuario;
    this.form.patchValue({
      flagAdmin: this.tipoUsuarioList.find((tu) => tu.id == newValue)
        ?.adm_padrao,
    });

    if (newValue === Constants.ALUNO_ID) {
      this.form.controls['plano'].setValidators(Validators.required);
      this.form.controls['horario_id'].setValidators(Validators.required);
    } else {
      this.form.controls['plano'].setValidators(Validators.nullValidator);
      this.form.controls['horario_id'].setValidators(Validators.nullValidator);
    }

    this.form.get('horario_id')?.updateValueAndValidity();
    this.form.get('plano')?.updateValueAndValidity();
  }

  submitForm() {
    this.loading = true;
    this.usuarioService.create(this.form.value).subscribe({
      next: (res: any) => {
        console.log('ok');
        this.toastr.success('Usuário cadastrado com sucesso!');
        this.createForm();
      },
      error: (err: any) => {
        this.loading = false;

        console.log(err);
        this.loading = false;
        // this.toastr.error(
        //   'Algo deu errado.' +
        //     JSON.stringify(err.error.details || err.error.message)
        // );
      },
      complete: () => {
        this.loading = false;
      },
    });
  }
}
