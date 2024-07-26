import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PessoaFormPage } from './pessoa-form.page';

describe('PessoaFormPage', () => {
  let component: PessoaFormPage;
  let fixture: ComponentFixture<PessoaFormPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PessoaFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
