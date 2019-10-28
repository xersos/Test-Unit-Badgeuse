import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PieChartAdminComponent } from './pie-chart-admin.component';

describe('PieChartAdminComponent', () => {
  let component: PieChartAdminComponent;
  let fixture: ComponentFixture<PieChartAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PieChartAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PieChartAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
