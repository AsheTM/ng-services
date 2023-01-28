import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgUtilityComponent } from './ng-utility.component';

describe('NgUtilityComponent', () => {
  let component: NgUtilityComponent;
  let fixture: ComponentFixture<NgUtilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgUtilityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgUtilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
