import { NgModule } from '@angular/core';

import {
  AutofocusDirective,
  ClickOutsideDirective
} from './directives';


@NgModule({
  exports: [
    AutofocusDirective,
    ClickOutsideDirective
  ],
  imports: [
    AutofocusDirective,
    ClickOutsideDirective
  ],
})
export class UtilityDirectivesModule { }
