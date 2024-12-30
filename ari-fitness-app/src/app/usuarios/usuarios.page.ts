import { ConfettiService } from './../../core/services/confetti/confetti.service';

import { ToastrService } from './../../core/services/toastr/toastr.service';
import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import Constants from 'src/core/Constants';
import { IUsuario, Usuario } from 'src/core/models/Usuario';
import { UsuarioService } from 'src/core/services/usuario/usuario.service';
import { ModalController } from '@ionic/angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Clipboard } from '@capacitor/clipboard';
import html2canvas from 'html2canvas';
import { v4 as uuid } from 'uuid';
import { DashboardMembersService } from 'src/core/services/dashboard/members/members.service';
import { AuthService } from 'src/core/services/auth/auth.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
})
export class UsuariosPage implements OnInit {
  Constants = Constants;
  tipoSelected: number | string = Constants.ALUNO_ID;
  usuarioList: Usuario[] = [];
  showCobrancaModal: boolean = false;
  showReciboModal: boolean = false;
  showFormReciboModal: boolean = false;
  isOpen: boolean = false;
  selectedUsuario?: Usuario | null;
  @Input() onlyList: boolean = false;
  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5'],
  };
  memberDataCard: {
    title: string;
    subtitle: string;
    data: {
      name: string;
      value?: number;
      series?: { name: string; value: number }[];
    }[];
    iconColor: string;
    chartType: string | null;
    value: number | string | null;
    cardIconName: string;
    tendency?: string;
    tendencyValue?: number | string | null;
    breakpoints?: {
      size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'auto';
      value: number;
    }[];
  }[] = [
    {
      title: 'Alunos',
      subtitle: 'Total de alunos',
      data: [],
      iconColor: 'primary',
      chartType: 'pie',
      value: null,
      cardIconName: 'people',
      tendency: 'up',
      tendencyValue: null,
    },
    {
      title: 'Novos Membros',
      subtitle: 'Mês ' + (new Date().getMonth() + 1).toString(),
      data: [
        {
          name: 'Mulheres',
          value: 7,
        },
        {
          name: 'Homens',
          value: 2,
        },
      ],
      iconColor: 'success',
      chartType: 'pie',
      value: 9,
      cardIconName: 'person-add',
      tendency: 'up',
      tendencyValue: 7,
    },
    {
      title: 'Desistentes',
      subtitle: 'No mês',
      data: [
        {
          name: 'Mulheres',
          value: 28,
        },
        {
          name: 'Homens',
          value: 35,
        },
      ],

      iconColor: 'warning',
      chartType: 'bar',
      value: '15',
      cardIconName: 'person-remove',
      tendency: 'down',
      tendencyValue: -8,
    },
    {
      title: 'Horários x Alunos',
      subtitle: '',
      data: [
        {
          name: '5:20h',
          value: Number((Math.random() * 100).toFixed(0)),
        },
        {
          name: '6:20h',
          value: Number((Math.random() * 100).toFixed(0)),
        },
        {
          name: '7:20h',
          value: Number((Math.random() * 100).toFixed(0)),
        },
        {
          name: '16:20h',
          value: Number((Math.random() * 100).toFixed(0)),
        },
        {
          name: '17:20h',
          value: Number((Math.random() * 100).toFixed(0)),
        },
        {
          name: '18:20h',
          value: Number((Math.random() * 100).toFixed(0)),
        },
        {
          name: '19:20h',
          value: Number((Math.random() * 100).toFixed(0)),
        },
      ],
      iconColor: 'danger',
      chartType: 'bar',
      value: null,
      cardIconName: 'alarm-outline',
      // tendency: 'down',
      // tendencyValue: -28,
    },
  ];
  discountType: string = '%';
  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private modalController: ModalController,
    private toastr: ToastrService,
    private confetti: ConfettiService,
    private dashboardMembersService: DashboardMembersService,
    private authService: AuthService
  ) {}
  user: IUsuario | null = null;
  ngOnInit() {
    this.user =  this.authService.getUser;
    this.getUsuarios();

    if (!this.onlyList) {
      this.getDashboardMembersData();
    }
  }

  getDashboardMembersData() {
    this.dashboardMembersService
      .getDashboardMembersData({
        fl_ativo: true,
        tipo_usuario: Constants.ALUNO_ID,
      })
      .subscribe({
        next: (res: {
          totalMembers: {
            male: number;
            female: number;
            total: number;
          };
          newMembers: {
            total: number;
            tendency: number;
            male: number;
            female: number;
          };
          memberAtLastMonth: number;
          horarios: {
            [key: string]: number;
          };
        }) => {
          console.log('res: ', res);
          this.buildTotalMembersChartCard(res);
          this.buildNovosMembrosChartCard(res);
          // this.buildDesistentesChartCard(res);
          this.buildHorariosChartCard(res);
        },
      });
  }

  buildHorariosChartCard(res: any) {
    this.memberDataCard[3].data = Object.keys(res.horarios).map((key) => ({
      name: key,
      value: res.horarios[key],
    }))
    //ordenar lista de horarios pelo horario
    this.memberDataCard[3].data.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    })
  }


  buildTotalMembersChartCard(res: any) {
    this.memberDataCard[0].value = res.totalMembers.total;
    this.memberDataCard[0].tendencyValue = `${res.totalMembers.total > res.memberAtLastMonth ? '+ ' : '- '}` + (res.totalMembers.total - (res.totalMembers.total - res.memberAtLastMonth) / 100);
    this.memberDataCard[0].data = [
      {
        name: 'Mulheres',
        value: res.totalMembers.female || 0,
      },
      {
        name: 'Homens',
        value: res.totalMembers.male || 0,
      },
    ];
  }

  buildNovosMembrosChartCard(res: any) {
    this.memberDataCard[1].value = res.newMembers.total;
    this.memberDataCard[1].tendencyValue = `${res.newMembers.total > res.memberAtLastMonth ? '+ ' : '- '}` + (res.newMembers.total - (res.newMembers.total - res.memberAtLastMonth) / 100);
    this.memberDataCard[1].data = [
      {
        name: 'Mulheres',
        value: res.newMembers.female || 0,
      },
      {
        name: 'Homens',
        value: res.newMembers.male || 0,
      },
    ];
  }

  buildDesistentesChartCard(res: any) {
    console.log('res: ', res);

    this.memberDataCard[2].value = res.newMembers.total;
    this.memberDataCard[2].tendencyValue = `${res.newMembers.total > res.memberAtLastMonth ? '+ ' : '- '}` + (res.newMembers.total - (res.newMembers.total - res.memberAtLastMonth) / 100);
    this.memberDataCard[2].data = [
      {
        name: 'Mulheres',
        value: res.newMembers.female
      },
      {
        name: 'Homens',
        value: res.newMembers.male,
      },
    ];
  }

  changeTipoUsuario(e: any) {
    this.tipoSelected = e.detail.value;
    this.getUsuarios(this.tipoSelected);
  }

  getUsuarios(tipoUsuario: number | string = Constants.ALUNO_ID) {
    this.usuarioService.findByFilters({ tipo_usuario: tipoUsuario, fl_ativo: true, empresa_id: this.user?.empresa?.id }).subscribe({
      next: (res) => {
        this.usuarioList = res.map((u: Usuario) => {
          return {
            ...u,
            idade:
              new Date().getFullYear() -
              new Date(u.data_nascimento).getFullYear(),
          };
        });
      },
    });
  }

  showNavigationOptions(usuario: Usuario) {
    this.isOpen = true;
    this.selectedUsuario = usuario;
  }

  navigate(path: string, user: Usuario | null = null) {
    if (!user) {
      return;
    }

    this.isOpen = false;
    setTimeout(() => {
      this.router.navigate([path], { queryParams: { userId: user.id } });
    }, 250);
  }

  cobrancaForm: FormGroup = new FormGroup({
    mes: new FormControl(null, [Validators.required]),
    ano: new FormControl(null, [Validators.required]),
  });

  get mes() {
    return this.cobrancaForm.get('mes');
  }

  get ano() {
    return this.cobrancaForm.get('ano');
  }

  get message(): string {
    return `
    Olá, Alana. Aqui é Ari, da *Ari Fitness*. Tudo bem? %0D
  Ainda não foi identificado o pagamento da sua mensalidade do mês de *${this.mes?.value}* de *${this.ano?.value}*.%0D
  Para informar o pagamento, favor enviar o comprovante de pagamento via WhatsApp. %0D%0D

  Caso ainda não tenha realizado o pagamento, segue os dados de transferência: %0D
    *Chave Pix*: minha@chave.pix %0D%0D
  Caso prefira utilizar o cartão de crédito, favor solicite um link de pagamento ou vá até a recepção. %0DSerá um prazer te atender!`;
  }

  sendMessage() {
    const message = document.getElementById('message')?.innerText;

    const mdMessage = this.message;

    const whasappUrl = `https://web.whatsapp.com/send?phone=5571985263173
    &text=${mdMessage}`;

    const a = document.createElement('a');
    a.href = whasappUrl;
    a.target = 'https://web.whatsapp.com/';
    a.click();
    this.showCobrancaModal = false;
    this.selectedUsuario = null;
  }

  copyMessage() {
    const message = this.message.replace(/%0D/g, '\n');
    navigator.clipboard.writeText(message);
    Clipboard.write({
      string: message,
    }).then(() => {
      this.toastr.success(
        'Mensagem copiada para area de  transferência!',
        'bottom'
      );
    });
  }

  openCobrancaModal(member: Usuario) {
    if (member.fl_ativo) {
      return;
    }
    this.selectedUsuario = member;
    this.showCobrancaModal = true;
  }

  anos: {
    value: number;
  }[] = new Array(5)
    .fill(0)
    .map((i, index) => ({ value: new Date().getFullYear() - index }));

  reciboForm: FormGroup = new FormGroup({
    id: new FormControl(null, [Validators.required]),
    member: new FormGroup({
      id: new FormControl(null, [Validators.required]),
      nome: new FormControl(null, [Validators.required]),
    }),
    plano: new FormGroup({
      id: new FormControl(null, [Validators.required]),
      descricao: new FormControl(null, [Validators.required]),
      valor: new FormControl(null, [Validators.required]),
    }),
    dataPagamento: new FormControl(new Date().toISOString().split('T')[0], [
      Validators.required,
    ]),
    mes: new FormControl(null, [Validators.required]),
    ano: new FormControl(null, [Validators.required]),
    desconto: new FormControl('0', [Validators.nullValidator]),
    discountType: new FormControl('%', [Validators.required]),
    valorPago: new FormControl(null, [Validators.required]),
    formaPagamento: new FormControl(null, [Validators.required]),
    comprovante: new FormControl(null, [Validators.nullValidator]),
  });

  openFormReciboModal(member: Usuario | null | undefined) {
    if (!member) return;

    const mesAtual = new Date().getMonth() + 1;
    const mesFormatado = mesAtual < 10 ? `0${mesAtual}` : `${mesAtual}`;
    this.selectedUsuario = member;
    this.showFormReciboModal = true;

    this.reciboForm.patchValue({
      id: uuid(),
      member: {
        id: member.id,
        nome: member.nome,
      },
      plano: {
        id: member.planos.id,
        descricao: member.planos.descricao,
        valor: member.planos.preco_padrao,
      },
      dataPagamento: new Date().toISOString().split('T')[0],
      mes: null,
      ano: new Date().getFullYear(),
      desconto: '0',
      discountType: '%',
      valorPago: member.planos.preco_padrao,
      formaPagamento: 'pix',
      comprovante: null,
    });

    console.log('this.reciboForm: ', this.reciboForm);
  }
  openReciboModal(member: Usuario | null | undefined) {
    if (!member) return;
    this.showReciboModal = true;
  }

  setDiscountType(type: string) {
    this.reciboForm.get('discountType')?.setValue(type);
    this.calculaValorFinal();
  }

  calculaValorFinal() {
    const desconto = this.reciboForm.get('desconto')?.value;
    const discountType = this.reciboForm.get('discountType')?.value;
    const valorPlano = Number(
      this.reciboForm.get('plano')?.get('valor')?.value
    );
    if (discountType === '%') {
      this.reciboForm
        .get('valorPago')
        ?.setValue(valorPlano - (Number(valorPlano) * desconto) / 100);
    } else {
      this.reciboForm.get('valorPago')?.setValue(Number(valorPlano) - desconto);
    }
  }

  recibo!: Recibo | null;
  gerarRecibo(recibo: Recibo) {
    this.recibo = recibo;
    const audio = new Audio('../../assets/audios/cash-register.mp3');
    console.log('audio: ', audio);

    audio.play();
    setTimeout(() => {
      this.confetti.showConfetti();
    }, 250);
    this.showReciboModal = true;
  }

  buildReciboImage(
    recibo: Recibo,
    callback: (data: { blob: Blob; base64: string }) => any
  ) {
    const reciboContainer = document.getElementById('recibo-container');

    return html2canvas(reciboContainer as HTMLElement).then((canvas) => {
      const img = document.createElement('img');
      img.src = canvas.toDataURL('image/png');
      const data = img.src.replace(/^data:image\/\w+;base64,/, '');
      const buffer = Buffer.from(data, 'base64');
      const blob = new Blob([buffer], { type: 'image/png' });
      callback({
        blob: blob,
        base64: data,
      });
    });
  }

  //TODO CORRIGIR A COPIA DO RECIBO
  copyReciboImage() {
    this.buildReciboImage(this.recibo!, (data) => {
      navigator.clipboard.write([
        new ClipboardItem({
          'image/png': data['base64'] as string,
        }),
      ]);
      // Clipboard.write({
      //   image: data['base64']
      // })
    });
  }

  downloadRecibo() {
    this.buildReciboImage(this.recibo!, (data) => {
      const url = URL.createObjectURL(data['blob']);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Recibo - ${this.recibo?.mes}-${this.recibo?.ano} - ${this.recibo?.member?.nome} .png`;
      link.click();
    });
  }
}

export interface Recibo {
  id: number;
  member: {
    id: number;
    nome: string;
  };
  plano: {
    id: number;
    descricao: string;
    valor: number;
  };
  dataPagamento: string;
  mes: number;
  ano: number;
  desconto: number;
  discountType: string;
  valorPago: number;
  formaPagamento: string;
  comprovante: string;
}
