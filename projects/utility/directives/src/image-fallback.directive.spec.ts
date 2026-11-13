import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageFallbackDirective } from './image-fallback.directive';


@Component({
  standalone: true,
  imports: [ImageFallbackDirective],
  template: `<img src="broken.png" alt="" ashetmImageFallback="fallback.png">`
})
class HostComponent { }

describe('ImageFallbackDirective', () => {
  let fixture: ComponentFixture<HostComponent>;
  let image: HTMLImageElement;

  beforeEach(() => {
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    image = fixture.nativeElement.querySelector('img');
  });

  afterEach(() => fixture.destroy());

  it('should show the fallback when the image fails to load', () => {
    // GIVEN
    // WHEN
    image.dispatchEvent(new Event('error'));

    // THEN
    expect(image.getAttribute('src')).toBe('fallback.png');
  });

  it('should not loop when the fallback fails too', () => {
    // GIVEN
    image.dispatchEvent(new Event('error'));
    const setSrc: jasmine.Spy = spyOnProperty(image, 'src', 'set').and.callThrough();

    // WHEN
    image.dispatchEvent(new Event('error'));

    // THEN
    expect(setSrc).not.toHaveBeenCalled();
  });
});
