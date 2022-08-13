import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompraPlanEmpresarialComponent } from './compra-plan-empresarial.component';

describe('CompraPlanEmpresarialComponent', () => {
  let component: CompraPlanEmpresarialComponent;
  let fixture: ComponentFixture<CompraPlanEmpresarialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompraPlanEmpresarialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompraPlanEmpresarialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
