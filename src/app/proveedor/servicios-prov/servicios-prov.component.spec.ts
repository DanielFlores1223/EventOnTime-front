import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiciosProvComponent } from './servicios-prov.component';

describe('ServiciosProvComponent', () => {
  let component: ServiciosProvComponent;
  let fixture: ComponentFixture<ServiciosProvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiciosProvComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiciosProvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
