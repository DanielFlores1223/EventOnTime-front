import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembresiaProvComponent } from './membresia-prov.component';

describe('MembresiaProvComponent', () => {
  let component: MembresiaProvComponent;
  let fixture: ComponentFixture<MembresiaProvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MembresiaProvComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MembresiaProvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
