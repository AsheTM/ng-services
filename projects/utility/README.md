
# @ashetm/ng-utility

``@ashetm/ng-utility`` is a library that provide some utilities classes, like pipes.

<!-- [![build status](http://img.shields.io/travis/likeastore/ngDialog.svg)](https://travis-ci.org/likeastore/ngDialog) -->
<!-- [![npm version](http://badge.fury.io/js/ng-dialog.svg)](http://badge.fury.io/js/ng-dialog) -->
<!-- [![github tag](https://img.shields.io/github/tag/likeastore/ngDialog.svg)](https://github.com/likeastore/ngDialog/tags) -->
<!-- [![Download Count](https://img.shields.io/npm/dm/ng-dialog.svg)](http://www.npmjs.com/package/ng-dialog) -->
<!-- [![Code Climate](https://codeclimate.com/github/likeastore/ngDialog/badges/gpa.svg)](https://codeclimate.com/github/likeastore/ngDialog) -->

<!-- ### [Demo](http://likeastore.github.io/ngDialog) -->

## Compatibility Table

| Angular Version    | @ashetm/ng-utility Version     | RxJS Version   | Support |
|--------------------|--------------------------------|----------------|---------|
| Angular 16.x and + | @ashetm/ng-utility 16.x and +  | 6.x.x and +    | ✅     |
| Angular 15.x       | @ashetm/ng-utility 15.x        | No requirement | ❌     |
| Angular 14.x       | @ashetm/ng-utility 14.x        | No requirement | ❌     |
| Angular 13.x       | @ashetm/ng-utility 13.x        | No requirement | ❌     |
| Angular 12.x       | @ashetm/ng-utility 12.x        | No requirement | ❌     |

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

### Custom RXJS Operators

All custom RXJS operators are available without importing the module.

#### `containsItem` Operator

```ts
function containsItem<T>(fn: (item: T) => boolean): OperatorFunction<T[], boolean> { ... }
```

This custom operator checks if any item in the array emitted by the observable satisfies a condition specified by the provided predicate function. It returns a boolean indicating whether the condition is met for any item in the array.

Parameters:

1. `fn`: A function that takes an item of type T and returns a boolean indicating whether the item satisfies the condition.

Returns:

An observable emitting a boolean (true if any item satisfies the condition, false otherwise).

Example: 

```tsx
const obs = new Observable<number[]>((observer) => {
  observer.next([1, 2, 3, 4, 5]);
  observer.complete();
});

obs.pipe(containsItem((item) => item > 3)).subscribe((result) => {
  console.log(result); // true (because 4 and 5 are greater than 3)
});

obs.pipe(containsItem((item) => item > 6)).subscribe((result) => {
  console.log(result); // false (no item greater than 6)
});
```

#### `filterFromArray` Operator

```ts
function filterFromArray<T>(fn: (value: T, index: number) => boolean): MonoTypeOperatorFunction<T[]> { ... }
```

This custom operator filters the array emitted by the observable based on a predicate function. The predicate function receives each item along with its index, and only the items for which the predicate returns true will be included in the resulting array.

Parameters:

1. `fn`: A function that takes a value of type T and its index in the array, returning a boolean that determines whether the item should be included in the filtered array.

Returns:

An observable that emits an array of items that passed the condition set by the predicate function.

Example: 

```tsx
const obs = new Observable<number[]>((observer) => {
  observer.next([1, 2, 3, 4, 5]);
  observer.complete();
});

obs.pipe(filterFromArray((item, index) => item % 2 === 0)).subscribe((result) => {
  console.log(result); // [2, 4] (only even numbers)
});

obs.pipe(filterFromArray((item, index) => index < 3)).subscribe((result) => {
  console.log(result); // [1, 2, 3] (first three items)
});
```

#### `firstFromArray` Operator

```ts
function firstFromArray<T>(): OperatorFunction<T[], T | undefined> { ... }
```

This custom operator extracts the first item from an array emitted by the observable. If the array is empty, it returns `undefined`.

Returns:

An observable emitting the first item from the array, or `undefined` if the array is empty.

Example:

```tsx
const obs = new Observable<number[]>((observer) => {
  observer.next([1, 2, 3, 4, 5]);
  observer.complete();
});

obs.pipe(firstFromArray()).subscribe((result) => {
  console.log(result); // 1 (first item in the array)
});

const emptyObs = new Observable<number[]>((observer) => {
  observer.next([]);
  observer.complete();
});

emptyObs.pipe(firstFromArray()).subscribe((result) => {
  console.log(result); // undefined (no items in the array)
});
```

#### `lastFromArray` Operator

```ts
function lastFromArray<T>(): OperatorFunction<T[], T | undefined> { ... }
```

This custom operator extracts the last item from an array emitted by the observable. If the array is empty, it returns `undefined`.

Returns:

An observable emitting the last item from the array, or `undefined` if the array is empty.

Example:

```tsx
const obs = new Observable<number[]>((observer) => {
  observer.next([1, 2, 3, 4, 5]);
  observer.complete();
});

obs.pipe(lastFromArray()).subscribe((result) => {
  console.log(result); // 5 (last item in the array)
});

const emptyObs = new Observable<number[]>((observer) => {
  observer.next([]);
  observer.complete();
});

emptyObs.pipe(lastFromArray()).subscribe((result) => {
  console.log(result); // undefined (no items in the array)
});
```

#### `mapFromArray` Operator

```ts
function mapFromArray<T, U = T>(fn: (item: T) => U): OperatorFunction<T[], U[]> { ... }
```

This custom operator maps each item of an array emitted by the observable to a new value using the provided transformation function. It returns a new array with the transformed items.

Parameters:

1. `fn`: A function that takes an item of type T and returns a transformed item of type U.

Returns:

An observable emitting an array of transformed items.

Example:

```tsx
const obs = new Observable<number[]>((observer) => {
  observer.next([1, 2, 3, 4, 5]);
  observer.complete();
});

obs.pipe(mapFromArray((item) => item * 2)).subscribe((result) => {
  console.log(result); // [2, 4, 6, 8, 10] (all items are doubled)
});

const stringObs = new Observable<string[]>((observer) => {
  observer.next(['apple', 'banana', 'cherry']);
  observer.complete();
});

stringObs.pipe(mapFromArray((item) => item.toUpperCase())).subscribe((result) => {
  console.log(result); // ['APPLE', 'BANANA', 'CHERRY'] (all items are uppercased)
});
```

#### `nthFromArray` Operator

```ts
function nthFromArray<T>(index: number): OperatorFunction<T[], T | undefined> { ... }
```

This custom operator extracts the item at the specified index from an array emitted by the observable. If the index is out of bounds or the array is empty, it returns `undefined`.

Parameters:

1. `index`: The index of the item to extract from the array. This is a number.

Returns:

An observable emitting the item at the specified index, or `undefined` if the index is out of bounds or the array is empty.

Example:

```tsx
const obs = new Observable<number[]>((observer) => {
  observer.next([1, 2, 3, 4, 5]);
  observer.complete();
});

obs.pipe(nthFromArray(2)).subscribe((result) => {
  console.log(result); // 3 (item at index 2 in the array)
});

obs.pipe(nthFromArray(5)).subscribe((result) => {
  console.log(result); // undefined (index out of bounds)
});

const emptyObs = new Observable<number[]>((observer) => {
  observer.next([]);
  observer.complete();
});

emptyObs.pipe(nthFromArray(0)).subscribe((result) => {
  console.log(result); // undefined (no items in the array)
});
```

#### `pluckFromArray` Operator

```ts
function pluckFromArray<T, U extends keyof T>(key: U): OperatorFunction<T[], T[U][]> { ... }
```

This custom operator extracts the value of a specific key from each item in an array emitted by the observable. It returns a new array containing only the values corresponding to the given key from each object.

Parameters:

1. `key`: The key whose value should be extracted from each item in the array. This is a property name of type U (which is a key of T).

Returns:

An observable emitting an array of values corresponding to the specified key for each item in the original array.

Example:

```tsx
interface User {
  id: number;
  name: string;
}

const obs = new Observable<User[]>((observer) => {
  observer.next([
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' },
  ]);
  observer.complete();
});

obs.pipe(pluckFromArray('name')).subscribe((result) => {
  console.log(result); // ['Alice', 'Bob', 'Charlie'] (only the 'name' values)
});

obs.pipe(pluckFromArray('id')).subscribe((result) => {
  console.log(result); // [1, 2, 3] (only the 'id' values)
});
```

### Custom Pipes

All pipes are standalone pipes. (Importing the module or the specific standalone pipe step is required)

#### ArrayFill

```ts
transform<T>(list: unknown[], value: T): T[] { ... }
```

Use on any array and fill it with the provided value of type T. The pipe replaces all elements in the array with the given value.

Example: 

```tsx
{{ [1, 2, 3, 4] | arrayFill:'hello' }} // ['hello', 'hello', 'hello', 'hello']
{{ [true, false, true] | arrayFill:false }} // [false, false, false]
{{ [1, 2, 3, 4] | arrayFill:100 }} // [100, 100, 100, 100]
```

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

#### ArrayIncludes

```ts
transform<T>(list: T[], value: T): boolean { ... }
```

Checks if the provided value of type T exists in the given array. Returns true if the array includes the value, otherwise false.

Example: 

```tsx
{{ [1, 2, 3, 4] | arrayIncludes:3 }} // true
{{ [1, 2, 3, 4] | arrayIncludes:5 }} // false
{{ ['apple', 'banana', 'cherry'] | arrayIncludes:'banana' }} // true
{{ ['apple', 'banana', 'cherry'] | arrayIncludes:'orange' }} // false
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

#### ArrayPop 

```ts
transform<T>(list: T[]): T | undefined { ... }
```

Removes and returns the last element of the provided array. If the array is empty, it returns undefined.

Example: 

```tsx
{{ [1, 2, 3, 4] | arrayPop }} // 4
{{ ['apple', 'banana', 'cherry'] | arrayPop }} // 'cherry'
{{ [] | arrayPop }} // undefined
```

**Note**: This pipe mutates the original array by removing its last element. Use with caution in cases where immutability is critical.

#### ArrayShuffle 

```ts
transform<T>(array: T[]): T[] { ... }
```

Randomly shuffles the elements of the given array and returns the modified array. The original array is mutated during the shuffle process.

Example: 

```tsx
{{ [1, 2, 3, 4] | arrayShuffle }} // [3, 1, 4, 2] (order will vary)
{{ ['apple', 'banana', 'cherry'] | arrayShuffle }} // ['banana', 'cherry', 'apple'] (order will vary)
```

**Note**: Since the original array is shuffled in place, use this pipe cautiously if immutability is required. The shuffled order is random and will vary each time the pipe is executed.

#### ArraySortAsc 

```ts
transform<T>(list: T[]): T[];
transform<T>(list: T[], key: keyof T): T[];
```

Sorts an array in ascending order. If a key is provided, it sorts the array based on the values of that key in each object. The sorting is case-sensitive for strings and follows standard numeric ordering for numbers.

Example: 

Sorting an array of numbers:

```tsx
{{ [3, 1, 4, 2] | arraySortAsc }} // [1, 2, 3, 4]
```

Sorting an array of strings:

```tsx
{{ ['banana', 'apple', 'cherry'] | arraySortAsc }} // ['apple', 'banana', 'cherry']
```

Sorting an array of objects by a key:

```tsx
{{ [{ name: 'Zara' }, { name: 'Anna' }, { name: 'Mike' }] | arraySortAsc:'name' }} // [{ name: 'Anna' }, { name: 'Mike' }, { name: 'Zara' }]
```

**Note**: This pipe depends on the ArraySort pipe to perform the actual sorting. Ensure that the ArraySort pipe is properly implemented and available for use.

#### ArraySortDesc 

```ts
transform<T>(list: T[]): T[];
transform<T>(list: T[], key: keyof T): T[];
```

Sorts an array in descending order. If a key is provided, it sorts the array based on the values of that key in each object. The sorting is case-sensitive for strings and follows standard numeric ordering for numbers.

Example: 

Sorting an array of numbers:

```tsx
{{ [3, 1, 4, 2] | arraySortDesc }} // [4, 3, 2, 1]
```

Sorting an array of strings:

```tsx
{{ ['banana', 'apple', 'cherry'] | arraySortDesc }} // ['cherry', 'banana', 'apple']
```

Sorting an array of objects by a key:

```tsx
{{ [{ name: 'Zara' }, { name: 'Anna' }, { name: 'Mike' }] | arraySortDesc:'name' }} // [{ name: 'Zara' }, { name: 'Mike' }, { name: 'Anna' }]
```

**Note**: This pipe relies on the ArraySort pipe to handle the sorting logic. Ensure that the ArraySort pipe is implemented and available for use.

#### ArraySort 

```ts
transform<T>(list: T[]): T[];
transform<T>(list: T[], direction: 'asc' | 'desc'): T[];
transform<T>(list: T[], direction: 'asc' | 'desc', key?: keyof T): T[];
```

Sorts an array in either ascending or descending order. If a key is provided, it sorts the array based on the values of that key in each object. The sorting direction defaults to ascending ('asc') if not specified.

Example: 

Sorting an array (ascending):

```tsx
{{ [3, 1, 4, 2] | arraySort  }} // [4, 3, 2, 1]
```

```tsx
{{ ['banana', 'apple', 'cherry'] | arraySort }} // ['apple', 'banana', 'cherry']
```

```tsx
{{ [{ name: 'Zara' }, { name: 'Anna' }, { name: 'Mike' }] | arraySort:'asc':'name' }} // [{ name: 'Anna' }, { name: 'Mike' }, { name: 'Zara' }]
```

Sorting an array (descending):

```tsx
{{ [3, 1, 4, 2] | arraySort:'desc' }} // [4, 3, 2, 1]
```

```tsx
{{ ['banana', 'apple', 'cherry'] | arraySort:'desc' }} // ['cherry', 'banana', 'apple']
```

```tsx
{{ [{ name: 'Zara' }, { name: 'Anna' }, { name: 'Mike' }] | arraySort:'desc':'name' }} // [{ name: 'Zara' }, { name: 'Mike' }, { name: 'Anna' }]
```

**Note**: This is a versatile pipe that serves as the base for specialized sorting pipes, such as `ArraySortAsc` and `ArraySortDesc`. It mutates the original array during sorting.

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

#### IsArray

```ts
transform(value: unknown): boolean { ... }
```

Checks if the provided value is an array. Returns true if the value is an array, otherwise false.

Example:

Checking an array:

```tsx
{{ [1, 2, 3] | isArray }} // true
```

Checking a string:

```tsx
{{ 'hello' | isArray }} // false
```

Checking an object:

```tsx
{{ { name: 'John' } | isArray }} // false
```

Checking a number:

```tsx
{{ 42 | isArray }} // false
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

#### IsDateAfter

```ts
transform<T extends Date | number | string>(value: T, dateAfter: T): boolean { ... }
```

Compares two dates (or values that can be converted into dates) and checks if the first date is after the second one. This pipe returns true if the first date is after the second date, and false otherwise.

Example: 

```tsx
{{ '2024-12-22' | isDateAfter:'2024-12-21' }} // true
{{ new Date('2024-12-22') | isDateAfter:1639593600000 }} // true (timestamp of '2021-12-17')
{{ 'invalid-date' | isDateAfter:'2024-12-21' }} // false
```

#### IsDateBefore

```ts
transform<T extends Date | number | string>(value: T, dateBefore: T): boolean { ... }
```

Compares two dates (or values that can be converted into dates) and checks if the first date is before the second one. This pipe returns true if the first date is before the second date, and false otherwise.

Example: 

```tsx
{{ '2024-12-20' | isDateBefore:'2024-12-21' }} // true
{{ new Date('2024-12-20') | isDateBefore:1639593600000 }} // false (timestamp of '2021-12-17')
{{ 'invalid-date' | isDateBefore:'2024-12-21' }} // false
```

#### IsDateBetween

```ts
transform<T extends Date | number | string>(value: T, minDate: T, maxDate: T): boolean;
transform<T extends Date | number | string>(value: T, [minDate, maxDate]: [T, T]): boolean;
transform<T extends Date | number | string>(value: T, interval: T | [T, T], max?: T): boolean { ... }
```

Checks if a given date (or value that can be converted to a date) is between two other dates. This pipe returns true if the given date is within the specified range and false otherwise.

Example: 

```tsx
{{ '2024-12-20' | isDateBetween:'2024-12-19':'2024-12-21' }} // true
{{ new Date('2024-12-20') | isDateBetween:['2024-12-19', '2024-12-21'] }} // true
{{ '2024-12-22' | isDateBetween:'2024-12-19':'2024-12-21' }} // false
{{ 'invalid-date' | isDateBetween:'2024-12-19':'2024-12-21' }} // false
```

#### IsDateFuture

```ts
transform<T extends Date | number | string>(value: T): boolean { ... }
```

Checks if a given date (or value that can be converted to a date) is in the future compared to the current date and time. This pipe returns true if the date is in the future and false otherwise.

Example: 

```tsx
{{ '2025-01-01' | isDateFuture }} // true
{{ new Date('2024-12-01') | isDateFuture }} // false
{{ 'invalid-date' | isDateFuture }} // false
```

#### IsDatePast

```ts
transform<T extends Date | number | string>(value: T): boolean { ... }
```

Checks if a given date (or value that can be converted to a date) is in the past compared to the current date and time. This pipe returns true if the date is in the past and false otherwise.

Example: 

```tsx
{{ '2020-01-01' | isDatePast }} // true
{{ new Date('2024-12-01') | isDatePast }} // false
{{ 'invalid-date' | isDatePast }} // false
```

#### Log

```ts
transform<T>(value: T): T;
transform<T>(value: T, type: 'log' | 'info' | 'warn' | 'error'): T;
transform<T>(value: T, type: 'log' | 'info' | 'warn' | 'error' = 'log'): T { ... }
```

Logs a value to the browser console with the specified log type. If no log type is provided, it defaults to log. The value is returned after being logged.

Example: 

```tsx
{{ 'This is a log message' | log }} // Logs 'This is a log message' to the console
{{ 'This is an info message' | log:'info' }} // Logs 'This is an info message' to the console as info
{{ 'This is a warning' | log:'warn' }} // Logs 'This is a warning' to the console as a warning
{{ 'This is an error' | log:'error' }} // Logs 'This is an error' to the console as an error
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
