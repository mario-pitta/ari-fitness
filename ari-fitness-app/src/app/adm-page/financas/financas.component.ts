import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-financas',
  templateUrl: './financas.component.html',
  styleUrls: ['./financas.component.scss'],
})
export class FinancasComponent implements OnInit {
  receitas: {
    valor: number;
    data: string;
    descricao: string;
  }[] = [
    {
      valor: 500,
      data: '2021-01-01',
      descricao: 'Receita 1',
    },
    {
      valor: 500,
      data: '2021-01-01',
      descricao: 'Receita 2',
    },
    {
      valor: 500,
      data: '2021-01-01',
      descricao: 'Receita 3',
    },
  ];

  despesas: {
    valor: number;
    data: string;
    descricao: string;
  }[] = [
    {
      valor: 500,
      data: '2021-01-01',
      descricao: 'Despesa 1',
    },
    {
      valor: 500,
      data: '2021-01-01',
      descricao: 'Despesa 1',
    },
    {
      valor: 500,
      data: '2021-01-01',
      descricao: 'Despesa 1',
    },
    {
      valor: 500,
      data: '2021-01-01',
      descricao: 'Despesa 1',
    },
    {
      valor: 500,
      data: '2021-01-01',
      descricao: 'Despesa 1',
    },
    {
      valor: 500,
      data: '2021-01-01',
      descricao: 'Despesa 1',
    },
    {
      valor: 500,
      data: '2021-01-01',
      descricao: 'Despesa 1',
    },
    {
      valor: 500,
      data: '2021-01-01',
      descricao: 'Despesa 1',
    },
    {
      valor: 500,
      data: '2021-01-01',
      descricao: 'Despesa 1',
    },
    {
      valor: 500,
      data: '2021-01-01',
      descricao: 'Despesa 1',
    },
    {
      valor: 500,
      data: '2021-01-01',
      descricao: 'Despesa 1',
    },
  ];
  openModalTransacao: boolean = false;
  action!: string;
  tipo!: string;



  constructor(private alertController: AlertController) {}

  ngOnInit() {
    this.getReceitas();
    this.getDespesas();
  }

  getReceitas() {
    this.receitas = this.buildRandomItems();
  }

  getDespesas() {
    this.despesas = this.buildRandomItems();
  }


  buildRandomItems() {
    return  new Array(10).fill(1).map((i) => {
      return {
        valor: Math.round(Math.random() * 1000),
        data: new Date().toISOString(),
        descricao: 'Receita ' + Math.round(Math.random() * 1000),
      };
    });
  }

  delete(index: number, tableName: string) {
    this.alertController
      .create({
        header: 'Atenção',
        message: 'Tem certeza que deseja excluir esse item?',
        buttons: [
          {
            text: 'Sim',
            handler: () => {
              this[tableName as 'receitas' | 'despesas'].splice(index, 1);
            },
          },
          {
            text: 'Nao',
            role: 'cancel',
          },
        ],
      })
      .then((alert) => alert.present());
  }


  openTransacaoForm( tipo: string = 'receita', action: string = 'nova', selectedTransacao?: any) {
    this.openModalTransacao = true;
    this.action = action;
    this.tipo = tipo;
  }


}
