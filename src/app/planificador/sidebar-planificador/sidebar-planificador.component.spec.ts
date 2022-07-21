import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarPlanificadorComponent } from './sidebar-planificador.component';

describe('SidebarPlanificadorComponent', () => {
  let component: SidebarPlanificadorComponent;
  let fixture: ComponentFixture<SidebarPlanificadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarPlanificadorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarPlanificadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
