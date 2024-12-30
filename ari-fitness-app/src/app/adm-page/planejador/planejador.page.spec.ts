import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlanejadorPage } from './planejador.page';

describe('PlanejadorPage', () => {
  let component: PlanejadorPage;
  let fixture: ComponentFixture<PlanejadorPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanejadorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
