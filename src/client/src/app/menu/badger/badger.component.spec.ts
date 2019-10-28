import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BadgerComponent } from './badger.component';

describe('BadgerComponent', () => {
  let component: BadgerComponent;
  let fixture: ComponentFixture<BadgerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BadgerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BadgerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
