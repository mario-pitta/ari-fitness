import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/core/models/Usuario';
import { AuthService } from 'src/core/services/auth/auth.service';
import { PagetitleService } from 'src/core/services/pagetitle.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage implements OnInit, OnDestroy {
  user: any
      // = {
      //   nome: 'Mario',
      //   flagAdmin: true,
      //   treinos: [
      //     {
      //       id: 1,
      //       descricao: 'Treino ABC1',
      //       exercicios: [
      //         {
      //           exercicio: {id: 1, descricao: 'agachamento'},
      //           repeticao: '12',
      //           series: '3',
      //           carga: null,
      //           equipamento: 'halteres',
      //         },
      //         {
      //           exercicio: {id: 1, descricao: 'agachamento'},
      //           repeticao: '12',
      //           series: '3',
      //           carga: null,
      //           equipamento: 'halteres',
      //         },
      //         {
      //           exercicio: {id: 1, descricao: 'agachamento'},
      //           repeticao: '12',
      //           series: '3',
      //           carga: null,
      //           equipamento: 'halteres',
      //         },
      //         {
      //           exercicio: {id: 1, descricao: 'agachamento'},
      //           repeticao: '12',
      //           series: '3',
      //           carga: null,
      //           equipamento: 'halteres',
      //         },
      //         {
      //           exercicio: {id: 1, descricao: 'agachamento'},
      //           repeticao: '12',
      //           series: '3',
      //           carga: null,
      //           equipamento: 'halteres',
      //         },
      //         {
      //           exercicio: {id: 1, descricao: 'agachamento'},
      //           repeticao: '12',
      //           series: '3',
      //           carga: null,
      //           equipamento: 'halteres',
      //         },
      //       ],
      //     },
      //     {
      //       id: 2,
      //       descricao: 'Treino ABC2',
      //       exercicios: [
      //         {
      //           exercicio: {id: 1, descricao: 'agachamento'},
      //           repeticao: '12',
      //           series: '3',
      //           carga: null,
      //           equipamento: 'halteres',
      //         },
      //         {
      //           exercicio: {id: 1, descricao: 'agachamento'},
      //           repeticao: '12',
      //           series: '3',
      //           carga: null,
      //           equipamento: 'halteres',
      //         },
      //         {
      //           exercicio: {id: 1, descricao: 'agachamento'},
      //           repeticao: '12',
      //           series: '3',
      //           carga: null,
      //           equipamento: 'halteres',
      //         },
      //         {
      //           exercicio: {id: 1, descricao: 'agachamento'},
      //           repeticao: '12',
      //           series: '3',
      //           carga: null,
      //           equipamento: 'halteres',
      //         },
      //         {
      //           exercicio: {id: 1, descricao: 'agachamento'},
      //           repeticao: '12',
      //           series: '3',
      //           carga: null,
      //           equipamento: 'halteres',
      //         },
      //         {
      //           exercicio: {id: 1, descricao: 'agachamento'},
      //           repeticao: '12',
      //           series: '3',
      //           carga: null,
      //           equipamento: 'halteres',
      //         },
      //       ],
      //     },
      //     {
      //       id: 3,
      //       descricao: 'Treino ABC3',
      //       exercicios: [
      //         {
      //           exercicio: {id: 1, descricao: 'agachamento'},
      //           repeticao: '12',
      //           series: '3',
      //           carga: null,
      //           equipamento: 'halteres',
      //         },
      //         {
      //           exercicio: {id: 1, descricao: 'agachamento'},
      //           repeticao: '12',
      //           series: '3',
      //           carga: null,
      //           equipamento: 'halteres',
      //         },
      //         {
      //           exercicio: {id: 1, descricao: 'agachamento'},
      //           repeticao: '12',
      //           series: '3',
      //           carga: null,
      //           equipamento: 'halteres',
      //         },
      //         {
      //           exercicio: {id: 1, descricao: 'agachamento'},
      //           repeticao: '12',
      //           series: '3',
      //           carga: null,
      //           equipamento: 'halteres',
      //         },
      //         {
      //           exercicio: {id: 1, descricao: 'agachamento'},
      //           repeticao: '12',
      //           series: '3',
      //           carga: null,
      //           equipamento: 'halteres',
      //         },
      //         {
      //           exercicio: {id: 1, descricao: 'agachamento'},
      //           repeticao: '12',
      //           series: '3',
      //           carga: null,
      //           equipamento: 'halteres',
      //         },
      //       ],
      //     },
      //     {
      //       id: 4,
      //       descricao: 'Treino ABC4',
      //       exercicios: [
      //         {
      //           exercicio: {id: 1, descricao: 'agachamento'},
      //           repeticao: '12',
      //           series: '3',
      //           carga: null,
      //           equipamento: 'halteres',
      //         },
      //         {
      //           exercicio: {id: 1, descricao: 'agachamento'},
      //           repeticao: '12',
      //           series: '3',
      //           carga: null,
      //           equipamento: 'halteres',
      //         },
      //         {
      //           exercicio: {id: 1, descricao: 'agachamento'},
      //           repeticao: '12',
      //           series: '3',
      //           carga: null,
      //           equipamento: 'halteres',
      //         },
      //         {
      //           exercicio: {id: 1, descricao: 'agachamento'},
      //           repeticao: '12',
      //           series: '3',
      //           carga: null,
      //           equipamento: 'halteres',
      //         },
      //         {
      //           exercicio: {id: 1, descricao: 'agachamento'},
      //           repeticao: '12',
      //           series: '3',
      //           carga: null,
      //           equipamento: 'halteres',
      //         },
      //         {
      //           exercicio: {id: 1, descricao: 'agachamento'},
      //           repeticao: '12',
      //           series: '3',
      //           carga: null,
      //           equipamento: 'halteres',
      //         },
      //       ],
      //     }
      //   ],
      // };

  pageTitle = 'Home';
  constructor(
    private titleService: PagetitleService,
    private auth: AuthService, private router: Router
  ) {
    console.log('TabsComponent Initing....');

    this.user = JSON.parse(localStorage.getItem('user') as string);
    this.titleService.title.asObservable().subscribe({
      next: (title) => {
        console.log('TabsComponent getting page title');
        this.pageTitle = title;
      },
    });
  }

  ngOnInit() {
    console.log('iniciando tabsPage')
    this.user = JSON.parse(localStorage.getItem('user') as string);
    if (this.user) {
      // this.updateLoggedUserData();
    } else {
      this.router.navigate(['login']);
    }
  }

  updateLoggedUserData() {
    this.auth.login(this.user.cpf, this.user.data_nascimento).subscribe({
      next: (user) => {
        console.log('user: ', user);
      },
    });
  }

  navigate(path: string){
    setTimeout(() => {
      console.log("dentro do timeout")
      this.router.navigate([path], {queryParams: {userId: this.user.id}})
    },80)
  }

  ngOnDestroy(){
    console.log("destroying tabs page")
  }
}
