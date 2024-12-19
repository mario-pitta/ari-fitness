
import { Component, OnInit } from '@angular/core';
import {
  NavigationEnd,
  NavigationStart,
  Router,
  RouterEvent,
} from '@angular/router';
import { OverlayControllerService } from 'src/core/services/overlay-controller.service';
import { PagetitleService } from 'src/core/services/pagetitle.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  route: string = '';
  showToastr: any;
  user: any;
  pageTitle: string = 'Ari Fitness Studio';

  constructor(
    private titleService: PagetitleService,
    private overlayService: OverlayControllerService,
    private router: Router,

  ) {}

  ngOnInit() {
    // console.log('AppComponent Initing....');
    // setTimeout(() => {

    //   this.confetti.clearConfetti();
    // }, 250);
    this.router.events.subscribe((ev: any) => {
      if (ev instanceof NavigationStart) {
        if (ev.navigationTrigger == 'popstate') {
          this.overlayService.closeAll(ev);
        }
      }
      if (ev instanceof NavigationEnd) {
        this.route = ev.url;
      }
    });

    this.user = JSON.parse(localStorage.getItem('user') as string);
    this.titleService.title.asObservable().subscribe({
      next: (title) => {
        // console.log('AppComponent getting page title', title);
        this.pageTitle = title;
      },
    });

  }

  navigateBack() {
    history.back()
  }
}
