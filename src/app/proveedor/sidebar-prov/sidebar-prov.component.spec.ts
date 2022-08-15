import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarProvComponent } from './sidebar-prov.component';

describe('SidebarProvComponent', () => {
  let component: SidebarProvComponent;
  let fixture: ComponentFixture<SidebarProvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarProvComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarProvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
