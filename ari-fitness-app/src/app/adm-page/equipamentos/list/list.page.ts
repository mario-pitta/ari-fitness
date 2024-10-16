
import { Component, inject, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Equipamento } from 'src/core/models/Equipamento';
import { EquipamentoService } from 'src/core/services/equipamento/equipamento.service';
import { PagetitleService } from 'src/core/services/pagetitle.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class EquipamentoListPage implements OnInit {
  router = inject(Router);

  loading: boolean = false;
  searchText: string = '';
  equipamentos: Equipamento[] = [];

  constructor(private eqpService: EquipamentoService, private page: PagetitleService) {

  }

  ngOnInit() {


    this.loading = true;
    this.eqpService.find({ fl_ativo: true }).subscribe({
      next: (equipamentos: Equipamento[]) => (this.equipamentos = equipamentos),
      error: (err) => console.error(err),
      complete: () => (this.loading = false),
    });
  }

  navigate(id: number) {
    this.router.navigate([
      "admin/equipamentos/form"],
      {
        queryParams: {
          eqpId: id
        },
      },
   );
  }
  delete(arg0: any) {
    throw new Error('Method not implemented.');
  }

}
