import { ConfettiService } from './../../core/services/confetti/confetti.service';
import { ToastrService } from './../../core/services/toastr/toastr.service';
import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { IUsuario, Usuario } from 'src/core/models/Usuario';
import { UsuarioService } from 'src/core/services/usuario/usuario.service';
import { ModalController } from '@ionic/angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Clipboard } from '@capacitor/clipboard';

import { DashboardMembersService } from 'src/core/services/dashboard/members/members.service';
import { AuthService } from 'src/core/services/auth/auth.service';
import { FormTransacaoFinaceiraComponent } from '../shared/form-transacao-finaceira/form-transacao-finaceira.component';
import { TransacaoFinanceiraService } from 'src/core/services/transacao-financeira/transacao-financeira.service';
import { TransacaoFinanceiraDashService } from 'src/core/services/dashboard/transacao-financeira-dash/transacao-financeira-dash.service';
import Constants from 'src/core/Constants';
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
})
export class UsuariosPage implements OnInit {
  showHistoricoModal: boolean = false;
  downloadRecibo() {
    throw new Error('Method not implemented.');
  }
  pagamentos: any[] = new Array(12).fill(0).map((_, index) => ({
    mes: index + 1,
    ano: new Date().getFullYear(),
    data: new Date(new Date().getFullYear(), index, 1),
    nome_mes: Constants.meses[index],
    pago: false,
    valor: 0,
  }));
  meses = Constants.meses;
  anos: {
    value: number;
  }[] = new Array(5)
    .fill(0)
    .map((i, index) => ({ value: new Date().getFullYear() - index }));
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
    size: number;
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
      size: 3,
      iconColor: 'primary',
      chartType: 'pie',
      value: null,
      cardIconName: 'people',
      tendency: 'up',
      tendencyValue: null,
    },
    {
      title: 'Novos Alunos',
      subtitle:
        'Mês ' + (new Date().getMonth() + 1).toLocaleString().toString(),
      size: 3,
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
      title: 'Visitantes',
      subtitle: 'No mês',
      size: 6,
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
      cardIconName: 'person',
      tendency: 'down',
      tendencyValue: -8,
    },
    {
      title: 'Horarios de Pico',
      subtitle: '',
      size: 6,
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
  recibo: any;
  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private modalController: ModalController,
    private toastr: ToastrService,
    private confetti: ConfettiService,
    private dashboardMembersService: DashboardMembersService,
    private authService: AuthService,
    private transacaoFinanceiraDashService: TransacaoFinanceiraDashService,
    private transacaoFinanceiraService: TransacaoFinanceiraService
  ) {}
  user: IUsuario | null = null;
  ngOnInit() {
    this.user = this.authService.getUser;
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
        empresa_id: this.user?.empresa?.id,
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
          this.buildDiariasChartCard(res);
          this.buildHorariosChartCard(res);
        },
      });
  }

  buildHorariosChartCard(res: any) {
    this.memberDataCard[3].data = Object.keys(res.horarios).map((key) => ({
      name: key,
      value: res.horarios[key],
    }));
    //ordenar lista de horarios pelo horario
    this.memberDataCard[3].data.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
  }

  buildTotalMembersChartCard(res: any) {
    this.memberDataCard[0].value = res.totalMembers.total;
    this.memberDataCard[0].tendencyValue =
      `${res.totalMembers.total > res.memberAtLastMonth ? '+ ' : '- '}` +
      (res.totalMembers.total -
        (res.totalMembers.total - res.memberAtLastMonth) / 100);
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
    this.memberDataCard[1].tendencyValue =
      `${res.newMembers.total > res.memberAtLastMonth ? '+ ' : '- '}` +
      (res.newMembers.total -
        (res.newMembers.total - res.memberAtLastMonth) / 100);
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

  buildDiariasChartCard(res: any) {
    this.transacaoFinanceiraDashService
      .getByPeriod(
        new Date().toISOString(),
        new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString(),
        this.user?.empresa?.id as string,
        {
          fl_ativo: true,
          tr_categoria_id: Constants.TR_CATEGORIA_DIARIA,
        }
      )
      .subscribe({
        next: (res) => {
          this.memberDataCard[2].value = res.length;
        },
      });
  }

  changeTipoUsuario(e: any) {
    this.tipoSelected = e.detail.value;
    this.getUsuarios(this.tipoSelected);
  }

  getUsuarios(tipoUsuario: number | string = Constants.ALUNO_ID) {
    const checkStatusPagamento = (u: Usuario) => {
      if (u.data_ultimo_pagamento !== null && u.data_vencimento !== null) {
        console.log('Checando pagamento: ', u.nome);

        const ultimoPagamento = new Date(u.data_ultimo_pagamento as string);
        console.log('ultimoPagamento', ultimoPagamento);

        const diaUltimoPagamento = ultimoPagamento.getDate();
        const mesUltimoPagamento = ultimoPagamento.getMonth();
        const anoUltimoPagamento = ultimoPagamento.getFullYear();

        const diaVencimento = u.data_vencimento;

        const hoje = new Date();
        const mesAtual = hoje.getMonth();
        const anoAtual = hoje.getFullYear();

        // --- Lógica para o mês atual ---
        if (
          mesUltimoPagamento === mesAtual &&
          anoUltimoPagamento === anoAtual
        ) {
          // Pagamento feito no mês atual, deve ser no dia ou após o dia de vencimento
          return diaUltimoPagamento >= diaVencimento;
        }

        // --- Lógica para o mês anterior ---
        const mesAnterior = mesAtual === 0 ? 11 : mesAtual - 1;
        const anoAnterior = mesAtual === 0 ? anoAtual - 1 : anoAtual;

        if (
          mesUltimoPagamento === mesAnterior &&
          anoUltimoPagamento === anoAnterior
        ) {
          // Pagamento feito no mês anterior, deve ser no dia ou após o dia de vencimento do mês anterior
          const ultimoDiaMesAnterior = new Date(
            anoAnterior,
            mesAnterior + 1,
            0
          ).getDate();
          const dataVencimentoMesAnterior = new Date(
            anoAnterior,
            mesAnterior,
            diaVencimento
          );

          // Se o dia de vencimento for maior que o último dia do mês anterior,
          // consideramos o último dia do mês anterior como a data de vencimento.
          const dataVencimentoAnteriorAjustada =
            diaVencimento > ultimoDiaMesAnterior
              ? new Date(anoAnterior, mesAnterior, ultimoDiaMesAnterior)
              : dataVencimentoMesAnterior;

          return ultimoPagamento >= dataVencimentoAnteriorAjustada;
        }

        return false;
      }
      return false;
    };

    this.usuarioService
      .findByFilters({
        tipo_usuario: tipoUsuario,
        fl_ativo: true,
        empresa_id: this.user?.empresa?.id,
      })
      .subscribe({
        next: (res) => {
          this.usuarioList = res.map((u: Usuario) => {
            return {
              ...u,
              idade:
                new Date().getFullYear() -
                new Date(u.data_nascimento).getFullYear(),
              fl_pago: checkStatusPagamento(u),
            };
          });
          console.log('this.usuarioList: ', this.usuarioList);
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
    if (member.fl_pago) {
      return;
    }
    this.selectedUsuario = member;
    this.showCobrancaModal = true;
  }

  openFormReciboModal(member: Usuario | null | undefined) {
    if (!member) return;

    const mesAtual = new Date().getMonth() + 1;
    const mesFormatado = mesAtual < 10 ? `0${mesAtual}` : `${mesAtual}`;
    this.selectedUsuario = member;

    this.modalController
      .create({
        component: FormTransacaoFinaceiraComponent,
        componentProps: {
          selectedMembro: member,
          categoriaTransacaoId: 1,
          mes: mesFormatado,
          ano: new Date().getFullYear(),
        },
      })
      .then((modal) => {
        modal.present();
        modal.onDidDismiss().then((res) => {
          console.log(res);
          if (res.data) {
            this.getUsuarios();
          }
        });
      });

    // this.reciboForm.patchValue({
    //   id: uuid(),
    //   member: {
    //     id: member.id,
    //     nome: member.nome,
    //   },
    //   plano: {
    //     id: member.planos.id,
    //     descricao: member.planos.descricao,
    //     valor: member.planos.preco_padrao,
    //   },
    //   dataPagamento: new Date().toISOString().split('T')[0],
    //   mes: null,
    //   ano: new Date().getFullYear(),
    //   desconto: '0',
    //   discountType: '%',
    //   valorPago: member.planos.preco_padrao,
    //   formaPagamento: 'pix',
    //   comprovante: null,
    // });

    // console.log('this.reciboForm: ', this.reciboForm);
  }

  async openHistoricoModal(member: Usuario | null | undefined, ano?: number) {
    if (!ano) ano = new Date().getFullYear();
    if (!member) return;
    this.selectedUsuario = member;

   this.filterAno({ detail: { value: { value: ano } } });
  }

  async filterAno(event: any) {
    const ano = event.detail.value.value;
    if (!this.selectedUsuario) return;

    console.log('ano', ano);

    const data_inicio = new Date(ano, 0, 1).toISOString();

    //ultimo dia do ano
    const data_fim = new Date(ano, 11, 31).toISOString();

    await this.buildPagamentosArray(ano);
    this.getTransacoesByUser(
      this.selectedUsuario.id as number,
      data_inicio,
      data_fim
    );
  }

  getTransacoesByUser(id: number, data_inicio: string, data_fim: string) {
    this.transacaoFinanceiraService
      .getTrasacoes({
        pago_por: id,
        empresa_id: this.user?.empresa_id,
        data_inicio,
        data_fim,
        tr_categoria_id: 1,
        fl_ativo: true,
      })
      .subscribe({
        next: (res) => {
          console.log('res', res);

          this.pagamentos = this.pagamentos.map((p) => {
            p.status = res.find((r: any) => {
              if (r.mes === p.mes && r.ano === p.ano)
               p =  {
                  ...p,
                  status: true,
                  transacao: r,
                };
            });

            return p;
          });

          console.log('this.pagamentos', this.pagamentos);

          this.showHistoricoModal = true;
        },
      });
  }

  buildPagamentosArray(ano: number = new Date().getFullYear()) {
    this.pagamentos = new Array(12).fill(0).map((_, index) => ({
      mes: index + 1,
      ano: ano,
      data: new Date(ano, index, 1),
      nome_mes: Constants.meses[index],
      pago: false,
      valor: 0,
    }));
  }
  openReciboModal(member: Usuario | null | undefined) {
    if (!member) return;
    this.showReciboModal = true;
  }
}
