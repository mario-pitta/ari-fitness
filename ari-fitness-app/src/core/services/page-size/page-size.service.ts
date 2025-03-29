import { Host, HostListener, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PageSizeService {
  isMobile = false;
  screenSize = 0;

  screenSizeChange$ = new BehaviorSubject<{
    screenSize: number;
    isMobile: boolean;
  }>({
    screenSize: 0,
    isMobile: false,
  });
  constructor() {
    this.screenSizeCalculate()
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    // console.log(event);
    this.screenSizeCalculate()
  }


  screenSizeCalculate() {
    this.screenSize = window.innerWidth;
    this.setSize(this.screenSize);
  }


  setSize(screenSize: number) {
    this.screenSizeChange$.next({
      screenSize: screenSize,
      isMobile: screenSize <= 769,
    });
  }

  getSize(): {
    screenSize: number;
    isMobile: boolean;
  } {
    return this.screenSizeChange$.value;
  }
}
