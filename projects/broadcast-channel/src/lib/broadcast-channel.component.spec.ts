import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BroadcastChannelComponent } from './broadcast-channel.component';

describe('BroadcastChannelComponent', () => {
  let component: BroadcastChannelComponent;
  let fixture: ComponentFixture<BroadcastChannelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BroadcastChannelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BroadcastChannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
