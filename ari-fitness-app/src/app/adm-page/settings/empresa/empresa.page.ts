import { Component, OnInit } from '@angular/core';
import {
  Form,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MaskitoElementPredicate } from '@maskito/core';
import Constants from 'src/core/Constants';
import { Empresa, Endereco, Plano } from 'src/core/models/Empresa';
import { Horario } from 'src/core/models/Horario';

import { AuthService } from 'src/core/services/auth/auth.service';
import { EmpresaService } from 'src/core/services/empresa/empresa.service';
import { ToastrService } from 'src/core/services/toastr/toastr.service';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.page.html',
  styleUrls: ['./empresa.page.scss'],
})
export class EmpresaPage implements OnInit {
  cnpjMask = Constants.cnpjMask;
  telefoneMask = Constants.phoneMask;
  loading: boolean = false;
  maskPredicate: MaskitoElementPredicate = async (el) =>
    (el as HTMLIonInputElement).getInputElement();

  empresaForm!: FormGroup;

  get f() {
    return this.empresaForm;
  }
  get planos() {
    return this.f.get('planos') as FormArray;
  }

  get horarios() {
    return this.f.get('horarios') as FormArray;
  }

  get enderecos() {
    return this.f.get('enderecos') as FormArray;
  }

  constructor(
    private empresaService: EmpresaService,
    private auth: AuthService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    console.log('iniciando empresa..');
    this.createForm();
    const empresaId = this.auth.getUser?.empresa_id;
    if (!empresaId) return;
    this.getEmpresaData(empresaId);
  }

  createForm() {
    this.empresaForm = this.fb.group({
      id: [null, Validators.nullValidator],
      cnpj: [null, Validators.required],
      nome: [null, Validators.required],
      nome_fantasia: [null, Validators.required],
      telefone: [null, Validators.required],
      email: [null, Validators.required],
      logo_url: [null, Validators.nullValidator],
      banner_url: [null, Validators.nullValidator],
      horarios: this.fb.array(
        [],
        [Validators.required, Validators.minLength(1)]
      ),
      planos: this.fb.array([], [Validators.required, Validators.minLength(1)]),
      enderecos: this.fb.array([], [Validators.nullValidator]),
      default_theme: ['dark', Validators.nullValidator],
      primary_color_hex: ['#4d8dff', Validators.nullValidator],
      created_at: [null, Validators.nullValidator],
      deleted_at: [null, Validators.nullValidator],
      updated_at: [null, Validators.nullValidator],
      accept_pix: [true, Validators.required],
      accept_credit_card: [true, Validators.required],
      accept_debit_card: [true, Validators.required],
      accept_money_in_cash: [true, Validators.required],
      pgmto_credito_max_parcelas: [
        1,
        [Validators.nullValidator, Validators.min(1)],
      ],
      chave_pix: [null, Validators.nullValidator],
      openai_key: [{ value: null, disabled: true }, Validators.nullValidator],
      meta_key: [{ value: null, disabled: true }, Validators.nullValidator],
    });
  }

  getEmpresaData(empresaId: string) {
    this.empresaService.getEmpresa(empresaId).subscribe({
      next: (res) => {
        console.log(res);
        this.completeForm(res);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  completeForm(empresa: Empresa) {
    this.empresaForm.patchValue(empresa);

    if(empresa.planos){
      empresa.planos.forEach(plano => {
        this.addPlano(plano);
      });
    }

    if(empresa.horarios){
      empresa.horarios.forEach(horario => {
        this.addHorario(horario);
      });
    }

    if(empresa.enderecos){
      empresa.enderecos.forEach(endereco => {
        this.addEndereco(endereco);
      });
    }

  }

  //#region Planos
  addPlano(plano?: Plano) {
    console.log(this.f);
    console.log('this.planos: ', this.planos);

    // if(!this.planos) this.f.get('planos')?.setValue(this.fb.array([]));

    this.planos.push(
      new FormGroup({
        id: new FormControl(plano?.id || null, [Validators.nullValidator]),
        created_at: new FormControl(plano?.created_at || null, [
          Validators.nullValidator,
        ]),
        descricao: new FormControl(plano?.descricao || null, [Validators.required]),
        preco_padrao: new FormControl(plano?.preco_padrao || null, [
          Validators.required,
        ]),
        fl_ativo: new FormControl(plano?.fl_ativo || true, [
          Validators.required,
        ]),
        qtd_dias_semana: new FormControl(plano?.qtd_dias_semana || 7, [
          Validators.required,
        ]),
        caracteristicas: new FormControl(plano?.caracteristicas || null, [
          Validators.nullValidator,
        ]),
      })
    );
  }
  removePlano(index: number) {
    this.planos.removeAt(index);
  }

  //#endregion

  //#region Horarios
  addHorario(horario?: Horario) {
    // if(!this.horarios) this.f.get('horarios')?.setValue(this.fb.array([]));

    this.horarios.push(
      new FormGroup({
        id: new FormControl(horario?.id || null, [Validators.nullValidator]),
        created_at: new FormControl(horario?.created_at || null, [
          Validators.nullValidator,
        ]),
        hora_inicio: new FormControl(horario?.hora_inicio || null, [
          Validators.required,
        ]),
        hora_fim: new FormControl(horario?.hora_fim || null, [
          Validators.required,
        ]),
        fl_ativo: new FormControl(horario?.fl_ativo || true, [
          Validators.required,
        ]),
        empresa_id: new FormControl(horario?.empresa_id || this.auth.getUser?.empresa_id, [
          Validators.required
        ])
      })
    );
  }
  removeHorario(index: number) {
    this.horarios.removeAt(index);
  }

  //#endregion

  //#region Enderecos
  addEndereco(endereco?: Endereco) {
    this.enderecos.push(
      this.fb.group({
        id: [endereco?.id, Validators.nullValidator],
        descricao: [endereco?.descricao, Validators.required],
        cep: [endereco?.cep, Validators.required],
        logradouro: [endereco?.logradouro, Validators.required],
        numero: [endereco?.numero, Validators.required],
        complemento: [endereco?.complemento, Validators.nullValidator],
        bairro: [endereco?.bairro, Validators.required],
        cidade: [endereco?.cidade, Validators.required],
        estado: [endereco?.estado, Validators.required],
      })
    );
  }

  removeEndereco(index: number) {
    this.enderecos.removeAt(index);
  }
  //#endregion

  //#region ImageHandler

  validateImage(file: File) {
    if (file.type.startsWith('image/')) {
      return true;
    } else {
      alert('Apenas imagens são permitidas');
      return false;
    }
  }
  onLogoChange($event: Event) {
    const file = ($event.target as HTMLInputElement).files?.[0];
    console.log('file: ', file);

    if (file && this.validateImage(file)) {
      const reader = new FileReader();

      reader.onload = (result) => {
        this.empresaForm
          .get('logo_url')
          ?.setValue(result.target?.result as string);
      };

      reader.readAsDataURL(file);
    } else {
      this.empresaForm.get('logo_url')?.setValue(null);
      return;
    }
  }

  onBannerChange($event: Event) {
    const file = ($event.target as HTMLInputElement).files?.[0];
    if (file && this.validateImage(file)) {
      const reader = new FileReader();

      reader.onload = (result) => {
        this.empresaForm
          .get('banner_url')
          ?.setValue(result.target?.result as string);
      };

      reader.readAsDataURL(file);
    } else {
      this.empresaForm.get('banner_url')?.setValue(null);
      return;
    }
  }
  //#endregion

  //#region submit handler
  onSaveButtonClick() {
    console.log(this.f);
    const req = this.f.value.id
      ? this.empresaService.updateEmpresa(this.f.value)
      : this.empresaService.createEmpresa(this.f.value);

    req.subscribe({
      next: (res) => {
        console.log('res: ', res);
        this.toastr.success('Empresa salva com sucesso!');

      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
