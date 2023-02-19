
# @ashetm/ng-utility

``@ashetm/ng-utility`` is a library that provide some utilities classes, like pipes.

*It works with Angular 14 and above*

<!-- [![build status](http://img.shields.io/travis/likeastore/ngDialog.svg)](https://travis-ci.org/likeastore/ngDialog) -->
<!-- [![npm version](http://badge.fury.io/js/ng-dialog.svg)](http://badge.fury.io/js/ng-dialog) -->
<!-- [![github tag](https://img.shields.io/github/tag/likeastore/ngDialog.svg)](https://github.com/likeastore/ngDialog/tags) -->
<!-- [![Download Count](https://img.shields.io/npm/dm/ng-dialog.svg)](http://www.npmjs.com/package/ng-dialog) -->
<!-- [![Code Climate](https://codeclimate.com/github/likeastore/ngDialog/badges/gpa.svg)](https://codeclimate.com/github/likeastore/ngDialog) -->


<!-- ### [Demo](http://likeastore.github.io/ngDialog) -->

## Install

You can install it with npm:

```bash
npm install @ashetm/ng-utility
```

## Import

You only need to import ``UtilityModule``.

```ts
...
import { UtilityModule } from '@ashetm/ng-utility';
...
@NgModule({
  ...
  imports: [
    ...
    UtilityModule, 
    ...
  ]
  ...
})
export class AppModule { }
```

## API

``@ashetm/ng-utility`` exposes the following: 

### Modules

* ``UtilityModule``, that needs to import in order to use the library.

### Pipes

All pipes are standalone pipes.

#### ArrayFilter

```ts
<T extends string | number | boolean> transform(
  value: T[], 
  filterBy?: string | number | boolean
): (string | number | boolean)[] { ... }
```

Use on array of string, number or boolean items, and needs an optional argument of type string, number or boolean.
If no argument provided, it will return the same array.

Example: 

```tsx
{{ [0, 'test', false, 100, 'texts'] | arrayfilter }} // [0, 'test', false, 100, 'texts']
{{ [0, 'test', false, 100, 'texts'] | arrayfilter:'te' }} // ['test', 'texts']
```

#### ArrayFrom

```ts
transform(length: number, fill?: number): number[] { ... }
```

Use on a number, and needs an optional argument of type number.
If no argument provided, it will return an array with index as value.

Example: 

```tsx
{{ 5 | arrayFrom }} // [0, 1, 2, 3, 4]
{{ 5 | arrayFrom:10 }} // [10, 10, 10, 10, 10]
```

#### ArrayPluck

```ts
transform(
    value: Array<Record<string | number, any>>,
    key: (string | number)
  ): Array<any> { ... }
```

Use on array of object items, and needs an argument of type number or string.

Example: 

```tsx
{{ [{ a: 1, b: 5 }, { a: 2, c: 4 }, { a: true, b: 'test', c: {} }] | arrayPluck:'b' }} // [5, 'test']
{{ [{ a: 1, b: 5 }, { a: 2, c: 4 }, { a: true, b: 'test', c: {} }] | arrayPluck:'a' }} // [1, 2, true]
```

#### CapitalCase

```ts
transform(value: string): string { ... }
```

Use on string.

Example: 

```tsx
{{ 'Lorum ipsum' | capitalCase }} // 'Lorum Ipson'
```

#### CoerciveBoolean

```ts
transform(value?: any): boolean { ... }
```

Use on any type.

Example: 

```tsx
{{ undefined | coerciveBoolean }} // true
{{ null | coerciveBoolean }} // false
{{ 'true' | coerciveBoolean }} // true
```

#### ControlErrors

```ts
transform(controls: AbstractControl): (string | any)[] { ... }
```

Use on any ``AbstractControl`` type.

Example: 

```tsx
formControl = new FormControl(null, {
  validators: [Validators.required, () => ({ customValidator: 'Custom Error Message in any key name!' })]
});
...
{{ formControl | controlErrors }} // ['This field is required', 'Custom Error Message in any key name!']
```

#### ControlValue

```ts
transform(value: AbstractControl): any { ... }
```

Use on any ``AbstractControl`` type.

Example: 

```tsx
formGroup = new FormGroup({
  test1: new FormControl('test'), 
  test2: new FormControl(null), 
});
...
{{ formGroup | controlValue }} // { test1: 'test', test2: null }
```

#### Initial

```ts
transform(value: string, max: number = Infinity): string { ... }
```

Use on a string, and needs an optional argument of type number.
If no argument provided, it will return string with initial of all words.

Example: 

```tsx
{{ 'abc Def Ghi Jkl' | initial }} // 'aDGJ'
{{ 'abc Def Ghi Jkl' | initial:2 }} // 'aD'
```

#### IsDate

```ts
transform(value: any): boolean { ... }
```

Use on a string, and needs an optional argument of type number.
If no argument provided, it will return string with initial of all words.

Example: 

```tsx
{{ 1676808350561 | isDate }} // true
{{ 'Sun Feb 19 2023 13:05:50 GMT+0100 (UTC+01:00)' | isDate }} // true
{{ 'WRONG' | isDate }} // false
```

#### ObjectEntries

```ts
transform(value: Record<string | number, any>): [string | number, any][] { ... }
```

Use on a object.

Example: 

Same as ``Object.entries``.

#### ObjectKeys

```ts
transform(value: Record<string | number, any>): Array<string> { ... }
```

Use on a object.

Example: 

Same as ``Object.keys``.

#### ObjectValues

```ts
transform(value: Record<string | number, any>): any[] { ... }
```

Use on a string, and needs an optional argument of type number.

Example: 

Same as ``Object.values``.

## Issue

LOOKING FOR MAINTAINER OR IF THERE IS AN ISSUE OR ANY IDEA TO ADD. PLEASE CREATE ISSUE IN GITHUB REPOSITORY.
