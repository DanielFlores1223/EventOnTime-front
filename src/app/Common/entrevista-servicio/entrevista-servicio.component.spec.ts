import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntrevistaServicioComponent } from './entrevista-servicio.component';

describe('EntrevistaServicioComponent', () => {
  let component: EntrevistaServicioComponent;
  let fixture: ComponentFixture<EntrevistaServicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntrevistaServicioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntrevistaServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
