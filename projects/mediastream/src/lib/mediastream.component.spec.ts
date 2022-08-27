import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediastreamComponent } from './mediastream.component';

describe('MediastreamComponent', () => {
  let component: MediastreamComponent;
  let fixture: ComponentFixture<MediastreamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MediastreamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MediastreamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
