import { NgModule } from '@angular/core';

import {
  AutofocusDirective,
  ClickOutsideDirective,
  CopyToClipboardDirective,
  DebounceClickDirective,
  ImageFallbackDirective,
  InViewportDirective
} from '@ashetm/ng-utility/directives';
import { TrimOnBlurDirective } from '@ashetm/ng-utility/forms';


@NgModule({
  exports: [
    AutofocusDirective,
    ClickOutsideDirective,
    CopyToClipboardDirective,
    DebounceClickDirective,
    ImageFallbackDirective,
    InViewportDirective,
    TrimOnBlurDirective
  ],
  imports: [
    AutofocusDirective,
    ClickOutsideDirective,
    CopyToClipboardDirective,
    DebounceClickDirective,
    ImageFallbackDirective,
    InViewportDirective,
    TrimOnBlurDirective
  ],
})
export class UtilityDirectivesModule { }
