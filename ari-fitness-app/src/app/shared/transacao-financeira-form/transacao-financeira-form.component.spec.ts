import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TransacaoFinanceiraFormComponent } from './transacao-financeira-form.component';

describe('TransacaoFinanceiraFormComponent', () => {
  let component: TransacaoFinanceiraFormComponent;
  let fixture: ComponentFixture<TransacaoFinanceiraFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TransacaoFinanceiraFormComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TransacaoFinanceiraFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
