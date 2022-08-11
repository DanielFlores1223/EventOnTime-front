import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanPagoComponent } from './plan-pago.component';

describe('PlanPagoComponent', () => {
  let component: PlanPagoComponent;
  let fixture: ComponentFixture<PlanPagoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanPagoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
