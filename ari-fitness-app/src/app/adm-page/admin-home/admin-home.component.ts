import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { IonSplitPaneCustomEvent } from '@ionic/core';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss'],
})
export class AdminHomeComponent implements OnInit {
  @ViewChild('content') content!: ElementRef;
  @ViewChild('menu') menu!: ElementRef;
  showSplitPane = false;
  ngOnInit() {
    console.log('iniciando admin-home...');
  }
  breadcrumbs: {
    title: string;
    href: string;
  }[] = [];

  constructor(
    private menuCtrl: MenuController,
    private router: Router
  ) {
    this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        const routes = e.url.split('/')
        console.log('e: ', routes);
        this.breadcrumbs = [];
        routes.forEach((route, index) => {
          if(index === 0 || route === 'admin') return

          this.breadcrumbs.push({
            title: route.split('?')[0].replace(/[^a-zA-Z0-9]/g, ' '),
            href: e.url.split('/').slice(0, index + 1).join('/')})
        })
        console.log('this.breadcrumbs: ', this.breadcrumbs);

        this.menuCtrl.enable(true);
      }
    })
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
