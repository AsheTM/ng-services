import { Type } from '@angular/core';

import * as directives from './directives';
import { UtilityDirectivesModule } from './utility-directives.module';


describe('UtilityDirectivesModule', () => {
  it('should export every directive of the library', () => {
    // GIVEN
    const allDirectives: Type<unknown>[] = Object.values(directives)
      .filter((value: unknown) => typeof value === 'function' && 'ɵdir' in (value as object)) as Type<unknown>[];

    // WHEN
    const exported: Type<unknown>[] = (UtilityDirectivesModule as unknown as { ɵmod: { exports: Type<unknown>[] } }).ɵmod.exports;

    // THEN
    allDirectives.forEach((directive: Type<unknown>) => expect(exported).withContext(directive.name).toContain(directive));
  });
});
