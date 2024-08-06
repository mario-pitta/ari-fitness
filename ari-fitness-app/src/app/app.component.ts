import { Component, OnInit } from '@angular/core';
import { PagetitleService } from 'src/core/services/pagetitle.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{
  showToastr: any;
  user: any;
  pageTitle: string = 'Ari Fitness Studio';

  constructor(private titleService: PagetitleService) {
  }

  ngOnInit() {
    console.log('AppComponent Initing....');

    this.user = JSON.parse(localStorage.getItem('user') as string);
    this.titleService.title.asObservable().subscribe({
      next: (title) => {
        console.log('AppComponent getting page title', title);
        this.pageTitle = title;
      },
    });
  }
}
