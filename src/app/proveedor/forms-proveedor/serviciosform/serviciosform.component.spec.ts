import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiciosformComponent } from './serviciosform.component';

describe('ServiciosformComponent', () => {
  let component: ServiciosformComponent;
  let fixture: ComponentFixture<ServiciosformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiciosformComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiciosformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
