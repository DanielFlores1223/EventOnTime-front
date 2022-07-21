import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPlanificadorComponent } from './dashboard-planificador.component';

describe('DashboardPlanificadorComponent', () => {
  let component: DashboardPlanificadorComponent;
  let fixture: ComponentFixture<DashboardPlanificadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardPlanificadorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardPlanificadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
