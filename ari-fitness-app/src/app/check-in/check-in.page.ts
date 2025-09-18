import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MaskitoElementPredicate } from '@maskito/core';
import Constants from 'src/core/Constants';
import { Empresa } from 'src/core/models/Empresa';
import { AuthService } from 'src/core/services/auth/auth.service';
import { EmpresaService } from 'src/core/services/empresa/empresa.service';

import { ConfettiService } from 'src/core/services/confetti/confetti.service';
import { PageSizeService } from 'src/core/services/page-size/page-size.service';

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.page.html',
  styleUrls: ['./check-in.page.scss'],
})
export class CheckInPage implements OnInit {
  cpfMask = Constants.cpfMask;
  cpf: string = '';
  empresa!: Empresa;
  checkinUrl: any;
  isMobile!: boolean;
  maskPredicate: MaskitoElementPredicate = async (el: any) =>
    (el as HTMLIonInputElement).getInputElement();

  constructor(
    private empresaService: EmpresaService,
    private auth: AuthService,
    private route: ActivatedRoute,
    private confettiService: ConfettiService,
    private mobileService: PageSizeService
  ) {
    this.checkinUrl =
      location.origin +
        '/check-in?empresa_id=' +
        this.auth.getUser?.empresa_id ||
      this.route.snapshot.queryParamMap.get('empresa_id') || '';

    this.mobileService.screenSizeChange$.subscribe((ev) => {
      this.isMobile = ev.isMobile;
    });
  }
  ngOnInit() {
    this.getEmpresaInfo();
  }

  getEmpresaInfo() {
    this.empresaService.getEmpresa(this.checkinUrl.split('=')[1]).subscribe({
      next: (res) => {
        console.log(res);
        this.empresa = new Empresa(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  registrarCheckIn() {
    console.log('CPF do aluno:', this.cpf);
    this.confettiService.showConfetti();
  }
}
