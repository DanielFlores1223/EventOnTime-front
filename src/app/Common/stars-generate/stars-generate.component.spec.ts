import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarsGenerateComponent } from './stars-generate.component';

describe('StarsGenerateComponent', () => {
  let component: StarsGenerateComponent;
  let fixture: ComponentFixture<StarsGenerateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StarsGenerateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StarsGenerateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
