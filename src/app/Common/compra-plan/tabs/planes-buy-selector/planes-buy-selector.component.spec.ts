import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanesBuySelectorComponent } from './planes-buy-selector.component';

describe('PlanesBuySelectorComponent', () => {
  let component: PlanesBuySelectorComponent;
  let fixture: ComponentFixture<PlanesBuySelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanesBuySelectorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanesBuySelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
