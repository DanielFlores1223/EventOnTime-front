import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactanosEmpresarialComponent } from './contactanos-empresarial.component';

describe('ContactanosEmpresarialComponent', () => {
  let component: ContactanosEmpresarialComponent;
  let fixture: ComponentFixture<ContactanosEmpresarialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactanosEmpresarialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactanosEmpresarialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
