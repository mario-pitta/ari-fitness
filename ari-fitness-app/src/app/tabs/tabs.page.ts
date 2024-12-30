import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import Constants from 'src/core/Constants';
import { Usuario } from 'src/core/models/Usuario';
import { AuthService } from 'src/core/services/auth/auth.service';
import { PagetitleService } from 'src/core/services/pagetitle.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage implements OnInit, OnDestroy {
  user: any;
  route: string = '/home'
  Constants = Constants;
  pageTitle = 'Home';
  isMobile = false;
  constructor(
    private titleService: PagetitleService,
    private auth: AuthService,
    private router: Router
  ) {
    // this.user = JSON.parse(localStorage.getItem('user') as string);
    this.titleService.title.asObservable().subscribe({
      next: (title) => {
        this.pageTitle = title;
        // this.route = this.aRoute.snapshot.url
      },
    });
  }

  ngOnInit() {
    this.router.events.subscribe(ev => {
      if(ev instanceof NavigationEnd){
        console.log('selected: ',ev);
        this.route = ev.url
      }
    })
    this.user = this.auth.getUser;
    console.log('this.user: ', this.user);

    if (this.user) {
      // this.updateLoggedUserData();
    } else {
      this.router.navigate(['login']);
    }
  }

  updateLoggedUserData() {
    this.auth.login(this.user.cpf, this.user.data_nascimento).subscribe({
      next: (user) => {
        // console.log('user: ', user);
      },
    });
  }

  navigate(path: string) {
    setTimeout(() => {
      this.router.navigate([path], { queryParams: { userId: this.user.id } });
    }, 80);
  }

  ngOnDestroy() {
    console.log('destroying tabs page');
  }
}
