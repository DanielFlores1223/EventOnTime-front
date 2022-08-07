import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompraPlanComponent } from './compra-plan.component';

describe('CompraPlanComponent', () => {
  let component: CompraPlanComponent;
  let fixture: ComponentFixture<CompraPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompraPlanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompraPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
