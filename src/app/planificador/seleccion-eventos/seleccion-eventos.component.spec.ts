import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionEventosComponent } from './seleccion-eventos.component';

describe('SeleccionEventosComponent', () => {
  let component: SeleccionEventosComponent;
  let fixture: ComponentFixture<SeleccionEventosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeleccionEventosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeleccionEventosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
