import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilProvComponent } from './perfil-prov.component';

describe('PerfilProvComponent', () => {
  let component: PerfilProvComponent;
  let fixture: ComponentFixture<PerfilProvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerfilProvComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerfilProvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
