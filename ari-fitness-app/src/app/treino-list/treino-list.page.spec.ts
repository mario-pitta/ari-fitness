import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TreinoListPage } from './treino-list.page';

describe('TreinoListPage', () => {
  let component: TreinoListPage;
  let fixture: ComponentFixture<TreinoListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TreinoListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
