
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { IonSplitPaneCustomEvent } from '@ionic/core';
import { tap } from 'rxjs';
import { Usuario } from 'src/core/models/Usuario';
import { AuthService } from 'src/core/services/auth/auth.service';
import { TransacaoFinanceiraDashService } from 'src/core/services/dashboard/transacao-financeira-dash/transacao-financeira-dash.service';
import { PageSizeService } from 'src/core/services/page-size/page-size.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss'],
})
export class AdminHomeComponent implements OnInit {
  @ViewChild('content') content!: ElementRef;
  @ViewChild('menu') menu!: ElementRef;
  showSplitPane = false;
  user!: Usuario

  breadcrumbs: {
    title: string;
    href: string;
  }[] = [];
  isMobile: boolean = false;

  constructor(
    private menuCtrl: MenuController,
    private router: Router,
    private pageSize: PageSizeService,
    private dashBoardService: TransacaoFinanceiraDashService,
    private authService: AuthService
  ) {
    this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        const routes = e.url.split('/');
        console.log('e: ', routes);
        this.breadcrumbs = [];
        routes.forEach((route, index) => {
          if (index === 0 || route === 'admin') return;

          this.breadcrumbs.push({
            title: route.split('?')[0].replace(/[^a-zA-Z0-9]/g, ' '),
            href: e.url
              .split('/')
              .slice(0, index + 1)
              .join('/'),
          });
        });
        console.log('this.breadcrumbs: ', this.breadcrumbs);

        this.menuCtrl.enable(true);
      }
    });
    this.pageSize.screenSizeChange$.asObservable().subscribe((e) => {
      this.isMobile = e.isMobile;
    });
  }



  ngOnInit() {

    this.isMobile = this.pageSize.getSize().isMobile;

  }

  toggleMenu() {
    this.menuCtrl.toggle(); // Abre ou fecha o menu
  }

  ngAfterViewInit() {
    const splitPane = this.menu.nativeElement as HTMLIonSplitPaneElement;
    console.log('splitPane: ', splitPane);
  }
  onSplitPaneVisible($event: IonSplitPaneCustomEvent<{ visible: boolean }>) {
    this.showSplitPane = $event.detail.visible;
    console.log('this.showSplitPane: ', this.showSplitPane);
  }
}
