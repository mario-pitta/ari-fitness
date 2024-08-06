import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FichaTreinoAlunoPage } from './ficha-treino-aluno.page';

describe('FichaTreinoAlunoPage', () => {
  let component: FichaTreinoAlunoPage;
  let fixture: ComponentFixture<FichaTreinoAlunoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FichaTreinoAlunoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
