import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InViewportDirective } from './in-viewport.directive';


@Component({
  standalone: true,
  imports: [InViewportDirective],
  template: `<div (ashetmInViewport)="events.push($event)" [ashetmInViewportThreshold]="0.5">Content</div>`
})
class HostComponent {
  events: boolean[] = [];
}

class IntersectionObserverMock {
  static instance?: IntersectionObserverMock;
  observed: Element[] = [];
  disconnected: boolean = false;

  constructor(
    readonly callback: (entries: Partial<IntersectionObserverEntry>[]) => void,
    readonly options: IntersectionObserverInit
  ) {
    IntersectionObserverMock.instance = this;
  }

  observe(element: Element): void {
    this.observed.push(element);
  }

  disconnect(): void {
    this.disconnected = true;
  }

  trigger(isIntersecting: boolean): void {
    this.callback([{ isIntersecting }]);
  }
}

describe('InViewportDirective', () => {
  const nativeIntersectionObserver: typeof IntersectionObserver = window.IntersectionObserver;
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(() => {
    (window as unknown as { IntersectionObserver: unknown }).IntersectionObserver = IntersectionObserverMock;
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
    window.IntersectionObserver = nativeIntersectionObserver;
  });

  it('should observe the element with the given threshold', () => {
    // GIVEN
    const observer: IntersectionObserverMock = IntersectionObserverMock.instance!;

    // WHEN
    const observed: Element[] = observer.observed;

    // THEN
    expect(observed).toEqual([fixture.nativeElement.querySelector('div')]);
    expect(observer.options.threshold).toBe(0.5);
  });

  it('should emit when the visibility changes, only once per change', () => {
    // GIVEN
    const observer: IntersectionObserverMock = IntersectionObserverMock.instance!;

    // WHEN
    observer.trigger(true);
    observer.trigger(true);
    observer.trigger(false);

    // THEN
    expect(fixture.componentInstance.events).toEqual([true, false]);
  });

  it('should stop observing when destroyed', () => {
    // GIVEN
    const observer: IntersectionObserverMock = IntersectionObserverMock.instance!;

    // WHEN
    fixture.destroy();

    // THEN
    expect(observer.disconnected).toBeTrue();
  });
});
