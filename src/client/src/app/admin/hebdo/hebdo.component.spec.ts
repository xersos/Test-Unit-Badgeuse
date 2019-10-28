import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HebdoComponent } from './hebdo.component';

describe('HebdoComponent', () => {
  let component: HebdoComponent;
  let fixture: ComponentFixture<HebdoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HebdoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HebdoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
