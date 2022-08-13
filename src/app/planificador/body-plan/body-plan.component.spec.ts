import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyPlanComponent } from './body-plan.component';

describe('BodyPlanComponent', () => {
  let component: BodyPlanComponent;
  let fixture: ComponentFixture<BodyPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BodyPlanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BodyPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
