import { NgModule } from '@angular/core';

import {
  ArrayFilter,
  ArrayFrom,
  ArrayPluck,
  CapitalCase,
  CoerciveBoolean,
  ControlErrors,
  ControlValue,
  Initial,
  IsDate,
  ObjectEntries,
  ObjectKeys,
  ObjectValues
} from './pipes';


@NgModule({
  exports: [
    ArrayFilter,
    ArrayFrom,
    ArrayPluck,
    CapitalCase,
    CoerciveBoolean,
    ControlErrors,
    ControlValue,
    Initial,
    IsDate,
    ObjectEntries,
    ObjectKeys,
    ObjectValues
  ],
  imports: [
    ArrayFilter,
    ArrayFrom,
    ArrayPluck,
    CapitalCase,
    CoerciveBoolean,
    ControlErrors,
    ControlValue,
    Initial,
    IsDate,
    ObjectEntries,
    ObjectKeys,
    ObjectValues
  ],
})
export class NgUtilityPipesModule { }
