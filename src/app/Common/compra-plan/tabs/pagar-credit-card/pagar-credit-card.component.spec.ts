import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagarCreditCardComponent } from './pagar-credit-card.component';

describe('PagarCreditCardComponent', () => {
  let component: PagarCreditCardComponent;
  let fixture: ComponentFixture<PagarCreditCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagarCreditCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagarCreditCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
