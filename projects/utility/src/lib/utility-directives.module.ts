import { NgModule } from '@angular/core';

import {
  AutofocusDirective,
  ClickOutsideDirective,
  CopyToClipboardDirective
} from './directives';


@NgModule({
  exports: [
    AutofocusDirective,
    ClickOutsideDirective,
    CopyToClipboardDirective
  ],
  imports: [
    AutofocusDirective,
    ClickOutsideDirective,
    CopyToClipboardDirective
  ],
})
export class UtilityDirectivesModule { }
