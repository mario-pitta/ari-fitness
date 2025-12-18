
import { Component, OnInit } from '@angular/core';
// @ts-ignore
import packageInfo from '../../../../../package.json';
@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

  public appVersion: string = packageInfo.version;
  public appName: string = "MVK Gym Manager";
  public developer: string = "Mario Pitta";
  public year: number = new Date().getFullYear();

  // Lista de tecnologias para exibir como "badges"
  public techStack = [
    { name: 'Ionic', icon: 'logo-ionic', color: 'primary' },
    { name: 'Angular', icon: 'logo-angular', color: 'danger' },
    { name: 'Vercel', icon: 'cloud-done', color: 'dark' },
    { name: 'KMS Auth', icon: 'key', color: 'warning' }
  ];

  constructor() { }

  ngOnInit() { }
}
