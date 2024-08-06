import { Injectable } from '@angular/core';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PagetitleService {
  title: BehaviorSubject<string> = new BehaviorSubject('Home');
  constructor(private router: Router) {
    this.router.events.subscribe({
      next: (ev) => {
        if(ev instanceof NavigationEnd){
          console.log('ev', ev)
          this.setTitle(ev.url.split('/')[1].split('?')[0].replace(/[^a-zA-Z0-9]/g, ' ').toUpperCase())
        }
      },
    });
  }

  getTitle(): string {
    return this.title.value;
  }

  setTitle(title: string) {
    console.log('setting title: ', title);
    this.title.next(title);
  }
}
