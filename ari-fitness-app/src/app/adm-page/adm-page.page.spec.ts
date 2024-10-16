import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdmPagePage } from './adm-page.page';

describe('AdmPagePage', () => {
  let component: AdmPagePage;
  let fixture: ComponentFixture<AdmPagePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
