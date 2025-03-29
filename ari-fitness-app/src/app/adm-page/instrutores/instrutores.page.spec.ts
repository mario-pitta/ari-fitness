import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InstrutoresPage } from './instrutores.page';

describe('InstrutoresPage', () => {
  let component: InstrutoresPage;
  let fixture: ComponentFixture<InstrutoresPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InstrutoresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
