import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FormTransacaoFinaceiraComponent } from './form-transacao-finaceira.component';

describe('FormTransacaoFinaceiraComponent', () => {
  let component: FormTransacaoFinaceiraComponent;
  let fixture: ComponentFixture<FormTransacaoFinaceiraComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FormTransacaoFinaceiraComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FormTransacaoFinaceiraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
