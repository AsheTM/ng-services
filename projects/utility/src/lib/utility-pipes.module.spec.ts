import { Type } from '@angular/core';

import * as forms from '@ashetm/ng-utility/forms';
import * as pipes from '@ashetm/ng-utility/pipes';
import { UtilityPipesModule } from './utility-pipes.module';


describe('UtilityPipesModule', () => {
  it('should export every pipe of the library', () => {
    // GIVEN
    const allPipes: Type<unknown>[] = [...Object.values(pipes), ...Object.values(forms)]
      .filter((value: unknown) => typeof value === 'function' && 'ɵpipe' in (value as object)) as Type<unknown>[];

    // WHEN
    const exported: Type<unknown>[] = (UtilityPipesModule as unknown as { ɵmod: { exports: Type<unknown>[] } }).ɵmod.exports;

    // THEN
    expect(allPipes.length).toBeGreaterThan(0);
    allPipes.forEach((pipe: Type<unknown>) => expect(exported).withContext(pipe.name).toContain(pipe));
  });
});
