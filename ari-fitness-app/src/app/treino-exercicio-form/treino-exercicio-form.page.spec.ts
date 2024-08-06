import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TreinoFormPage } from './treino-exercicio-form.page';

describe('TreinoFormPage', () => {
  let component: TreinoFormPage;
  let fixture: ComponentFixture<TreinoFormPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TreinoFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
