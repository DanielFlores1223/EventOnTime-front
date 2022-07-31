import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardProvComponent } from './dashboard-prov.component';

describe('DashboardProvComponent', () => {
  let component: DashboardProvComponent;
  let fixture: ComponentFixture<DashboardProvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardProvComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardProvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
