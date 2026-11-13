
# @ashetm/ng-utility

[![npm version](https://img.shields.io/npm/v/@ashetm/ng-utility.svg)](https://www.npmjs.com/package/@ashetm/ng-utility)
[![npm downloads](https://img.shields.io/npm/dm/@ashetm/ng-utility.svg)](https://www.npmjs.com/package/@ashetm/ng-utility)

``@ashetm/ng-utility`` is a library that provide some utilities classes, like pipes.

## Compatibility Table

| Angular Version    | @ashetm/ng-utility Version     | RxJS Version   | Support |
|--------------------|--------------------------------|----------------|---------|
| Angular 20.x and +  | @ashetm/ng-utility 20.x       | 7.4.x and +    | ✅     |
| Angular 16.x – 19.x | @ashetm/ng-utility 16.x       | 6.x.x and +    | ❌     |
| Angular 15.x       | @ashetm/ng-utility 15.x        | No requirement | ❌     |
| Angular 14.x       | @ashetm/ng-utility 14.x        | No requirement | ❌     |
| Angular 13.x       | @ashetm/ng-utility 13.x        | No requirement | ❌     |
| Angular 12.x       | @ashetm/ng-utility 12.x        | No requirement | ❌     |

The version follows the Angular version it starts from: **16.x** supports Angular 16 to 19, **20.x** supports Angular 20 and above (there are no 17.x, 18.x or 19.x versions).

16.x is no longer supported, as Angular 16 to 19 have reached their end of life: it stays installable, but gets no more fixes.

## Install

You can install it with npm:

```bash
npm install @ashetm/ng-utility
```

This installs the latest version, for Angular 20+. On **Angular 16–19**, install the 16.x version instead:

```bash
npm install @ashetm/ng-utility@16
```

### Upgrading from 16.x

* Angular 20+ and RxJS 7.4+ are required. ``@angular/cdk`` isn't needed anymore.
* ``controlErrors`` and ``controlValue`` return an Observable: add ``| async`` (``{{ control | controlErrors | async }}``).
* ``ControlErrors``, ``TimeAgo`` and ``FileSize`` use ``inject()``: creating them with ``new`` only works in an injection context.
* Imports from ``@ashetm/ng-utility`` keep working; the new entry points (``/pipes``, ``/operators``, ``/directives``, ``/signals``, ``/forms``) are optional.

## Import

The library is split into entry points. Import from the one you need:

| Entry point                      | Content                                                                 |
|----------------------------------|-------------------------------------------------------------------------|
| ``@ashetm/ng-utility/pipes``      | the pipes (except the form ones)                                        |
| ``@ashetm/ng-utility/operators``  | the RxJS operators                                                      |
| ``@ashetm/ng-utility/directives`` | the directives (except ``TrimOnBlurDirective``)                         |
| ``@ashetm/ng-utility/signals``    | the signal helpers (except the form ones)                               |
| ``@ashetm/ng-utility/forms``      | ``ControlErrors``, ``ControlValue``, ``provideControlErrorsMessages``, ``TrimOnBlurDirective``, ``controlErrorsSignal``, ``controlValueSignal`` |
| ``@ashetm/ng-utility``            | everything above, and the modules                                       |

Only ``@ashetm/ng-utility/forms`` (and ``@ashetm/ng-utility``) needs ``@angular/forms``: it's an optional peer dependency.

```ts
import { Truncate } from '@ashetm/ng-utility/pipes';
import { withLoading } from '@ashetm/ng-utility/operators';
import { debouncedSignal } from '@ashetm/ng-utility/signals';
import { ControlErrors } from '@ashetm/ng-utility/forms';
```

Every pipe and directive is standalone, so you can import only the ones you use in a standalone component. Or import ``UtilityModule`` (all pipes and directives):

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

* ``UtilityModule``, that needs to import in order to use the library (exports both modules below).
* ``UtilityPipesModule``, all the pipes.
* ``UtilityDirectivesModule``, all the directives.

### Custom RXJS Operators

All custom RXJS operators are available without importing the module, from ``@ashetm/ng-utility/operators``.

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

#### `catchAndReturn` Operator

```ts
function catchAndReturn<T, R>(value: R): OperatorFunction<T, T | R> { ... }
```

On error, emits `value` and completes, instead of erroring. A shortcut for `catchError(() => of(value))`.

Example: 

```tsx
this.http.get<User[]>('/api/users').pipe(catchAndReturn([])); // [] when the request fails
```

#### `countFromArray` Operator

```ts
function countFromArray<T>(fn: (item: T, index: number) => boolean): OperatorFunction<T[] | null | undefined, number> { ... }
```

Counts the items of each emitted array that match `fn` (`0` for `null` / `undefined`).

Example: 

```tsx
of([1, 5, 10, 15]).pipe(countFromArray((item) => item > 4)); // 3
```

#### `debug` Operator

```ts
function debug<T>(label: string, options?: DebugOptions): (source$: Observable<T>) => Observable<T> { ... }

interface DebugOptions {
  level?: 'log' | 'info' | 'warn' | 'error' | 'debug'; // default 'log'
  events?: ('subscribe' | 'next' | 'error' | 'complete' | 'unsubscribe')[]; // default all
  enabled?: boolean; // default isDevMode()
}
```

Logs the events of a stream with a label, without changing it. The emitted value is passed as its own argument, so the browser console shows it fully expandable. Errors always use `console.error`. `unsubscribe` is only logged when the stream is stopped before it completes or errors. By default it's silent in production (`isDevMode()`).

Example: 

```tsx
users$.pipe(debug('users'));
// [users] subscribe
// [users] next: ▶ (2) [{…}, {…}]
// [users] complete

users$.pipe(debug('users', { level: 'info', events: ['next', 'error'] }));
```

#### `filterNullish` Operator

```ts
function filterNullish<T>(): OperatorFunction<T, NonNullable<T>> { ... }
```

Drops `null` and `undefined` values (`0`, `''` and `false` are kept). The result is typed as non-null.

Example: 

```tsx
of('a', null, 0, undefined).pipe(filterNullish()); // 'a', 0
```

#### `groupByFromArray` Operator

```ts
function groupByFromArray<T>(key: keyof T): OperatorFunction<T[] | null | undefined, Record<string, T[]>> { ... }
```

Groups the items of each emitted array by the value of `key` (same as the `arrayGroupBy` pipe).

Example: 

```tsx
of([{ type: 'a', name: 'x' }, { type: 'b', name: 'y' }]).pipe(groupByFromArray('type')); // { a: [x], b: [y] }
```

#### `isEmptyArray` Operator

```ts
function isEmptyArray<T>(): OperatorFunction<T[] | null | undefined, boolean> { ... }
```

Emits `true` when the emitted array is empty, `null` or `undefined`.

Example: 

```tsx
this.users$.pipe(isEmptyArray()); // true while there is no user
```

#### `pick` Operator

```ts
function pick<T, K extends keyof T>(key: K): OperatorFunction<T | null | undefined, T[K] | undefined> { ... }
```

Reads `key` of each emitted value (`undefined` for `null` / `undefined`). Replaces RxJS's deprecated `pluck`.

Example: 

```tsx
this.user$.pipe(pick('name')); // 'John'
```

#### `sortFromArray` Operator

```ts
function sortFromArray<T>(direction: 'asc' | 'desc' = 'asc', key?: keyof T): OperatorFunction<T[] | null | undefined, T[]> { ... }
```

Sorts a copy of each emitted array (same as the `arraySort` pipe); the emitted array itself is left untouched.

Example: 

```tsx
of([3, 1, 2]).pipe(sortFromArray()); // [1, 2, 3]
this.users$.pipe(sortFromArray('desc', 'age'));
```

#### `sumFromArray` Operator

```ts
function sumFromArray<T>(key?: keyof T): OperatorFunction<T[] | null | undefined, number> { ... }
```

Sums the numbers of each emitted array, or the values of `key` (same as the `arraySum` pipe).

Example: 

```tsx
this.cart$.pipe(sumFromArray('price')); // total price
```

#### `uniqueFromArray` Operator

```ts
function uniqueFromArray<T>(key?: keyof T): OperatorFunction<T[] | null | undefined, T[]> { ... }
```

Removes duplicates from each emitted array, optionally by `key` (same as the `arrayUnique` pipe).

Example: 

```tsx
of([3, 1, 3, 2]).pipe(uniqueFromArray()); // [3, 1, 2]
```

#### `withLoading` Operator

```ts
function withLoading<T>(options?: { keepData?: boolean }): OperatorFunction<T, LoadingState<T>> { ... }

type LoadingState<T> =
  | { loading: true, data?: T }                    // pending
  | { loading: false, data: T }                    // done
  | { loading: false, data?: T, error: unknown };  // failed
```

Turns a request into loading states: `{ loading: true }` on subscribe, `{ loading: false, data }` for each value, and `{ loading: false, error }` on error (then it completes, so the template doesn't break).

With `keepData: true`, the last data stays in the following states (`{ loading: true, data }` during a reload), so a list doesn't disappear while it refreshes. The data is remembered by the operator instance: create it once and reuse it for each request.

Example: 

```ts
users$ = this.http.get<User[]>('/api/users').pipe(withLoading());

// With a reload, keeping the previous list visible
private readonly loading = withLoading<User[]>({ keepData: true });
users$ = this.reload$.pipe(
  startWith(undefined),
  switchMap(() => this.http.get<User[]>('/api/users').pipe(this.loading))
);
```

```html
<ng-container *ngIf="users$ | async as state">
  <app-spinner *ngIf="state.loading"></app-spinner>
  <p *ngIf="state.error">Could not load users.</p>
  <ul *ngIf="state.data as users">
    <li *ngFor="let user of users">{{ user.name }}</li>
  </ul>
</ng-container>
```

### Custom Pipes

All pipes are standalone pipes, from ``@ashetm/ng-utility/pipes`` (the form pipes ``ControlErrors`` and ``ControlValue`` are in ``@ashetm/ng-utility/forms``). Importing the module or the specific standalone pipe is required.

#### ArrayFill

```ts
transform<T>(list: unknown[], value: T): T[] { ... }
```

Use on any array and fill it with the provided value of type T. The pipe returns a new array where all elements are the given value; the original array is not modified.

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

Use on array of object items, and needs an argument of type number or string. Items without that key (``null`` / ``undefined``) are skipped; falsy values like ``0``, ``''`` and ``false`` are kept.

Example: 

```tsx
{{ [{ a: 1, b: 5 }, { a: 2, c: 4 }, { a: true, b: 'test', c: {} }] | arrayPluck:'b' }} // [5, 'test']
{{ [{ a: 1, b: 5 }, { a: 2, c: 4 }, { a: true, b: 'test', c: {} }] | arrayPluck:'a' }} // [1, 2, true]
```

#### ArrayPop 

```ts
transform<T>(list: T[]): T | undefined { ... }
```

Returns the last element of the provided array, without removing it. If the array is empty, it returns undefined.

Example: 

```tsx
{{ [1, 2, 3, 4] | arrayPop }} // 4
{{ ['apple', 'banana', 'cherry'] | arrayPop }} // 'cherry'
{{ [] | arrayPop }} // undefined
```

#### ArrayShuffle 

```ts
transform<T>(array: T[]): T[] { ... }
```

Randomly shuffles the elements of the given array and returns a new array; the original array is not modified.

Example: 

```tsx
{{ [1, 2, 3, 4] | arrayShuffle }} // [3, 1, 4, 2] (order will vary)
{{ ['apple', 'banana', 'cherry'] | arrayShuffle }} // ['banana', 'cherry', 'apple'] (order will vary)
```

**Note**: The shuffled order is random. As a pure pipe, it shuffles again only when the input array changes.

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

Sorts an array in either ascending or descending order. If a key is provided, it sorts the array based on the values of that key in each object. The sorting direction defaults to ascending ('asc') if not specified. It returns a new array (the original array is not modified), and equal items keep their order.

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

#### ArrayAverage

```ts
transform(list: number[] | null | undefined): number | null;
transform<T>(list: T[] | null | undefined, key: keyof T): number | null;
```

Returns the average of the numbers, or of the values of ``key``. Values that aren't numbers are ignored; ``null`` when there is no number.

Example: 

```tsx
{{ [1, 2, 6] | arrayAverage }} // 3
{{ [{ score: 10 }, { score: 20 }] | arrayAverage:'score' }} // 15
{{ [] | arrayAverage }} // null
```

#### ArrayChunk

```ts
transform<T>(list: T[] | null | undefined, size: number): T[][] { ... }
```

Splits the list into groups of ``size`` items; the last group may be smaller. A size below 1 is treated as 1.

Example: 

```tsx
{{ [1, 2, 3, 4, 5] | arrayChunk:2 }} // [[1, 2], [3, 4], [5]]
```

#### ArrayFirst

```ts
transform<T>(list: T[] | null | undefined): T | undefined { ... }
```

Returns the first item, or ``undefined`` for an empty list, ``null`` or ``undefined``.

Example: 

```tsx
{{ [1, 5, 10] | arrayFirst }} // 1
{{ [] | arrayFirst }} // undefined
```

#### ArrayGroupBy

```ts
transform<T>(list: T[] | null | undefined, key: keyof T): Record<string, T[]> { ... }
```

Groups the items by the value of ``key``, keeping their order. Works well with Angular's ``keyvalue`` pipe.

Example: 

```tsx
{{ [{ type: 'fruit', name: 'apple' }, { type: 'vegetable', name: 'carrot' }, { type: 'fruit', name: 'banana' }] | arrayGroupBy:'type' }}
// { fruit: [apple, banana], vegetable: [carrot] }
```

#### ArrayIsEmpty

```ts
transform(list: unknown[] | null | undefined): boolean { ... }
```

Returns ``true`` for an empty list, ``null`` or ``undefined``.

Example: 

```tsx
{{ [] | arrayIsEmpty }} // true
{{ [0] | arrayIsEmpty }} // false
```

#### ArrayLast

```ts
transform<T>(list: T[] | null | undefined): T | undefined { ... }
```

Returns the last item, or ``undefined`` for an empty list, ``null`` or ``undefined``.

Example: 

```tsx
{{ [1, 5, 10] | arrayLast }} // 10
```

#### ArrayReverse

```ts
transform<T>(list: T[] | null | undefined): T[] { ... }
```

Returns a reversed copy; the original array is not modified.

Example: 

```tsx
{{ [1, 2, 3] | arrayReverse }} // [3, 2, 1]
```

#### ArraySum

```ts
transform(list: number[] | null | undefined): number;
transform<T>(list: T[] | null | undefined, key: keyof T): number;
```

Returns the sum of the numbers, or of the values of ``key``. Values that aren't numbers are ignored; ``0`` for an empty list.

Example: 

```tsx
{{ [1, 2, 3.5] | arraySum }} // 6.5
{{ [{ price: 10 }, { price: 2 }] | arraySum:'price' }} // 12
```

#### ArrayUnique

```ts
transform<T>(list: T[] | null | undefined): T[];
transform<T>(list: T[] | null | undefined, key: keyof T): T[];
```

Removes duplicates (optionally by ``key``), keeping the first occurrence.

Example: 

```tsx
{{ [3, 1, 3, 2, 1] | arrayUnique }} // [3, 1, 2]
{{ [{ id: 1, name: 'a' }, { id: 1, name: 'b' }] | arrayUnique:'id' }} // [{ id: 1, name: 'a' }]
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
{{ undefined | coerciveBoolean }} // false
{{ null | coerciveBoolean }} // false
{{ 'false' | coerciveBoolean }} // false
{{ '' | coerciveBoolean }} // true (like a boolean attribute: <input disabled>)
{{ 'true' | coerciveBoolean }} // true
```

#### ControlErrors

```ts
transform(control: AbstractControl | null | undefined): Observable<(string | any)[]> { ... }
```

Use on any ``AbstractControl`` type, with ``| async``. It returns an Observable of the messages, which follows the control's errors (the pipe is pure).

Example: 

```tsx
formControl = new FormControl(null, {
  validators: [Validators.required, () => ({ customValidator: 'Custom Error Message in any key name!' })]
});
...
{{ formControl | controlErrors | async }} // ['This field is required', 'Custom Error Message in any key name!']
```

##### Configurable messages

By default, only ``required`` has a message, and other errors are returned as they are (a custom validator's text, or the error details). Add ``provideControlErrorsMessages()`` to get English messages for Angular's built-in validators (``required``, ``requiredTrue``, ``email``, ``minlength``, ``maxlength``, ``min``, ``max``, ``pattern``), and to add or replace messages: a text, or a function receiving the error details.

```ts
import { provideControlErrorsMessages } from '@ashetm/ng-utility/forms';

// English defaults
providers: [provideControlErrorsMessages()]

// Your own messages (e.g. translated), merged with the defaults
providers: [
  provideControlErrorsMessages({
    required: 'Ce champ est obligatoire',
    minlength: (error) => `Au moins ${error.requiredLength} caractères`,
    phone: 'Numéro de téléphone invalide' // a custom validator's key
  })
]
```

It can be provided for the whole application, or in a component's ``providers``. Error keys without a message keep the default behavior. Also exported: ``CONTROL_ERRORS_MESSAGES`` (the token), ``DEFAULT_CONTROL_ERRORS_MESSAGES``, and the ``ControlErrorMessage`` / ``ControlErrorsMessages`` types.

#### ControlValue

```ts
transform(control: AbstractControl | null | undefined): Observable<any> { ... }
```

Use on any ``AbstractControl`` type, with ``| async``. It returns an Observable of the raw value (disabled controls included), which follows the control's value (the pipe is pure).

Example: 

```tsx
formGroup = new FormGroup({
  test1: new FormControl('test'), 
  test2: new FormControl(null), 
});
...
{{ formGroup | controlValue | async }} // { test1: 'test', test2: null }
```

#### DateDiff

```ts
transform(value: Date | number | string | null | undefined, other: Date | number | string | null | undefined, unit: DateDiffUnit = 'days'): number | null { ... }

type DateDiffUnit = 'milliseconds' | 'seconds' | 'minutes' | 'hours' | 'days' | 'weeks';
```

Returns ``value - other`` in whole units (rounded toward zero), or ``null`` when a date is missing or invalid.

Example: 

```tsx
{{ '2026-01-15' | dateDiff:'2026-01-10' }} // 5
{{ endDate | dateDiff:startDate:'hours' }} // e.g. 36
```

#### DateMax

```ts
transform<T extends number | string | Date>(value: T[]): Date | null { ... }
```

Returns the latest date of a list of dates (or values that can be converted to a date), or ``null`` for an empty list.

Example: 

```tsx
{{ ['2024-12-19', '2024-12-21', '2024-12-20'] | dateMax }} // Date of 2024-12-21
{{ [] | dateMax }} // null
```

#### DateMin

```ts
transform<T extends number | string | Date>(value: T[]): Date | null { ... }
```

Returns the earliest date of a list of dates (or values that can be converted to a date), or ``null`` for an empty list.

Example: 

```tsx
{{ ['2024-12-19', '2024-12-21', '2024-12-20'] | dateMin }} // Date of 2024-12-19
{{ [] | dateMin }} // null
```

#### DefaultValue

```ts
transform<T, D>(value: T | null | undefined, fallback: D): T | D { ... }
```

Returns ``fallback`` when the value is ``null``, ``undefined`` or ``''``; other values (including ``0`` and ``false``) are kept.

Example: 

```tsx
{{ user.nickname | defaultValue:'—' }} // '—' when there is no nickname
{{ 0 | defaultValue:'—' }} // 0
```

#### FileSize

```ts
transform(bytes: number | null | undefined, decimals: number = 1, locale?: string): string { ... }
```

Makes a size in bytes readable (1 KB = 1024 bytes), in the app's language (``LOCALE_ID``) or the given locale. ``''`` for ``null``, ``undefined``, negative or invalid sizes.

Example: 

```tsx
{{ 1536 | fileSize }} // '1.5 KB'
{{ file.size | fileSize:2 }} // '1.25 GB'
{{ file.size | fileSize:2:'fr' }} // '1,25 GB'
```

#### Format

```ts
transform<T extends string | number | boolean>(value: T, mask: string): string { ... }
```

Formats a value with a mask: each ``*`` is replaced by the next character of the value, other characters are kept.

Example: 

```tsx
{{ '0612345678' | format:'** ** ** ** **' }} // '06 12 34 56 78'
{{ 1234 | format:'**-**' }} // '12-34'
```

#### Initial

```ts
transform(value: string, max: number = Infinity): string { ... }
```

Use on a string, and needs an optional argument of type number.
If no argument provided, it will return string with initial of all words, in upper case. Repeated spaces are ignored.

Example: 

```tsx
{{ 'abc Def Ghi Jkl' | initial }} // 'ADGJ'
{{ 'abc Def Ghi Jkl' | initial:2 }} // 'AD'
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

#### ObjectFilter

```ts
transform<T extends object>(value: T | null | undefined, predicate?: (entryValue: T[keyof T], key: keyof T) => boolean): Partial<T> { ... }
```

Returns a new object with the entries matching ``predicate``. Without a predicate, it drops ``null``, ``undefined`` and ``''`` values (``0`` and ``false`` are kept). Templates can't contain arrow functions, so pass a component method.

Example: 

```tsx
{{ { a: 1, b: null, c: '' } | objectFilter }} // { a: 1 }
{{ prices | objectFilter:isExpensive }} // with isExpensive = (price: number) => price > 100
```

#### ObjectGet

```ts
transform<T = unknown>(value: unknown, path: string | (string | number)[], fallback?: T): T | undefined { ... }
```

Reads a nested value by path (``'address.city'``, ``'items.0.name'`` or ``['items', 0, 'name']``). Returns ``fallback`` (default ``undefined``) when a step of the path is missing, instead of throwing.

Example: 

```tsx
{{ user | objectGet:'address.city' }} // 'Paris'
{{ user | objectGet:'company.name':'—' }} // '—'
```

#### ObjectHas

```ts
transform(value: unknown, path: string | (string | number)[]): boolean { ... }
```

Returns ``true`` when every step of the path exists (even with an ``undefined`` value).

Example: 

```tsx
{{ user | objectHas:'address.city' }} // true
{{ user | objectHas:'company.name' }} // false
```

#### ObjectInvert

```ts
transform(value: Record<string, string | number | boolean> | null | undefined): Record<string, string> { ... }
```

Swaps keys and values (values become string keys). With duplicate values, the last key wins.

Example: 

```tsx
{{ { fr: 'France', es: 'Spain' } | objectInvert }} // { France: 'fr', Spain: 'es' }
```

#### ObjectIsEmpty

```ts
transform(value: object | null | undefined): boolean { ... }
```

Returns ``true`` for an object without keys, ``null`` or ``undefined``.

Example: 

```tsx
{{ {} | objectIsEmpty }} // true
{{ { a: 1 } | objectIsEmpty }} // false
```

#### ObjectOmit

```ts
transform<T extends object, K extends keyof T>(value: T | null | undefined, keys: K[]): Omit<T, K> { ... }
```

Returns a new object without the given keys.

Example: 

```tsx
{{ { a: 1, b: 2, c: 3 } | objectOmit:['b'] }} // { a: 1, c: 3 }
```

#### ObjectPick

```ts
transform<T extends object, K extends keyof T>(value: T | null | undefined, keys: K[]): Pick<T, K> { ... }
```

Returns a new object with only the given keys (keys missing from the object are skipped).

Example: 

```tsx
{{ { a: 1, b: 2, c: 3 } | objectPick:['a', 'c'] }} // { a: 1, c: 3 }
```

#### ObjectSize

```ts
transform(value: object | null | undefined): number { ... }
```

Returns the number of keys; ``0`` for ``null`` or ``undefined``.

Example: 

```tsx
{{ { a: 1, b: 2 } | objectSize }} // 2
```

#### Slugify

```ts
transform(value: string | null | undefined): string { ... }
```

Turns a text into a URL-friendly slug: lower case, accents removed, anything that isn't a letter or a digit replaced by a single ``-``.

Example: 

```tsx
{{ '  Hello, World!  ' | slugify }} // 'hello-world'
{{ 'Crème brûlée à Paris' | slugify }} // 'creme-brulee-a-paris'
```

#### TimeAgo

```ts
transform(value: Date | number | string | null | undefined, locale?: string, now?: Date | number): string { ... }
```

Describes a date relative to now: "3 minutes ago", "yesterday", "in 2 days"... in the app's language (``LOCALE_ID``) or the given locale (browser's ``Intl.RelativeTimeFormat``). ``''`` for ``null``, ``undefined`` or an invalid date.

**Note**: as a pure pipe, it updates when the date changes, not as time passes.

Example: 

```tsx
{{ comment.createdAt | timeAgo }} // '3 minutes ago'
{{ event.date | timeAgo:'fr' }} // 'dans 2 jours'
```

#### Truncate

```ts
transform(value: string | null | undefined, length: number, suffix: string = '…', wholeWords: boolean = false): string { ... }
```

Keeps the first ``length`` characters and adds ``suffix`` when the text is longer. With ``wholeWords``, the text is cut at the last space before ``length``.

Example: 

```tsx
{{ 'Hello wonderful world' | truncate:9 }} // 'Hello won…'
{{ 'Hello wonderful world' | truncate:9:'...' }} // 'Hello won...'
{{ 'Hello wonderful world' | truncate:9:'…':true }} // 'Hello…'
```

### Directives

All directives are standalone, prefixed ``ashetm``, and safe with server-side rendering. They're in ``@ashetm/ng-utility/directives``, except ``TrimOnBlurDirective`` (``@ashetm/ng-utility/forms``).

#### AutofocusDirective

* _Selector_: ``[ashetmAutofocus]``

Focuses the element once it's rendered. ``[ashetmAutofocus]="false"`` disables it.

```html
<input ashetmAutofocus>
<input [ashetmAutofocus]="isEditing">
```

#### ClickOutsideDirective

* _Selector_: ``[ashetmClickOutside]``
* _Output_: ``(ashetmClickOutside)``: ``MouseEvent``

Emits when the user clicks outside the element, e.g. to close a menu.

```html
<div class="menu" *ngIf="open" (ashetmClickOutside)="open = false">...</div>
```

#### CopyToClipboardDirective

* _Selector_: ``[ashetmCopyToClipboard]``: the text to copy
* _Outputs_: ``(copied)``: the copied text, ``(copyFailed)``: the error

Copies the text to the clipboard on click. ``copyFailed`` gets a ``NotSupportedError`` when the clipboard isn't available (server, page not served over HTTPS).

```html
<button [ashetmCopyToClipboard]="link" (copied)="showToast('Copied!')">Copy link</button>
```

#### DebounceClickDirective

* _Selector_: ``[ashetmDebounceClick]``
* _Input_: ``[ashetmDebounceClickTime]``: delay in milliseconds (default ``500``)
* _Output_: ``(ashetmDebounceClick)``: ``MouseEvent``

Emits the first click right away, then ignores clicks during the delay. Prevents double submits.

```html
<button (ashetmDebounceClick)="save()" [ashetmDebounceClickTime]="1000">Save</button>
```

#### ImageFallbackDirective

* _Selector_: ``img[ashetmImageFallback]``: the fallback image

Shows the fallback image when the image fails to load (only once, if the fallback fails too).

```html
<img [src]="user.avatar" ashetmImageFallback="assets/default-avatar.png">
```

#### InViewportDirective

* _Selector_: ``[ashetmInViewport]``
* _Input_: ``[ashetmInViewportThreshold]``: visible part needed, from ``0`` to ``1`` (default ``0``)
* _Output_: ``(ashetmInViewport)``: ``true`` when the element enters the screen, ``false`` when it leaves it

Uses the browser's ``IntersectionObserver``; does nothing on the server.

```html
<section (ashetmInViewport)="visible = $event" [ashetmInViewportThreshold]="0.5">...</section>
```

#### TrimOnBlurDirective

* _Selector_: ``input[ashetmTrimOnBlur]``, ``textarea[ashetmTrimOnBlur]``

Trims the text when leaving the field. Works with plain fields, reactive forms and ``ngModel`` (also with ``updateOn: 'blur'``).

```html
<input ashetmTrimOnBlur formControlName="email">
```

### Signal Helpers

Functions that create signals, available without importing the module (Angular 20+ only), from ``@ashetm/ng-utility/signals`` (``controlValueSignal`` and ``controlErrorsSignal`` are in ``@ashetm/ng-utility/forms``). Unless written otherwise, they must be called in an injection context (a field initializer or a constructor), or with ``{ injector }``. They clean up when that injector is destroyed (e.g. the component).

```ts
interface SignalOptions { injector?: Injector; }
```

#### controlValueSignal

```ts
function controlValueSignal<TRawValue>(control: AbstractControl<any, TRawValue>, options?: SignalOptions): Signal<TRawValue> { ... }
```

The raw value of a control (disabled controls included), following the control. The signal version of the ``controlValue`` pipe.

```ts
form = new FormGroup({ name: new FormControl(''), age: new FormControl(0) });
value = controlValueSignal(this.form); // { name: '', age: 0 }
```

#### controlErrorsSignal

```ts
function controlErrorsSignal(control: AbstractControl, options?: SignalOptions): Signal<(string | any)[]> { ... }
```

The error messages of a control, following the control. The signal version of the ``controlErrors`` pipe: it uses ``provideControlErrorsMessages()`` too.

```ts
name = new FormControl('', Validators.required);
nameErrors = controlErrorsSignal(this.name); // ['This field is required']
canSave = computed(() => this.nameErrors().length === 0);
```

#### debouncedSignal

```ts
function debouncedSignal<T>(source: Signal<T>, time: number, options?: SignalOptions): Signal<T> { ... }
```

Follows ``source`` once it hasn't changed for ``time`` milliseconds. Useful for search fields.

```ts
query = signal('');
debouncedQuery = debouncedSignal(this.query, 300);
```

#### previousSignal

```ts
function previousSignal<T>(source: Signal<T>): Signal<T | undefined> { ... }
```

The value ``source`` had before its last change (``undefined`` at first). No injection context needed. Like ``computed``, it's lazy: changes made between two reads count as one.

```ts
page = signal(1);
previousPage = previousSignal(this.page); // after page.set(2): 1
```

#### nowSignal

```ts
function nowSignal(every: number = 60_000, options?: SignalOptions): Signal<number> { ... }
```

The current time (``Date.now()``), updated every ``every`` milliseconds. Use it with the ``now`` parameter of ``timeAgo`` to keep the text up to date. On the server, it isn't updated.

```ts
now = nowSignal();
```

```html
{{ message.date | timeAgo : undefined : now() }}
```

#### toggleSignal

```ts
function toggleSignal(initial: boolean = false): ToggleSignal { ... }

type ToggleSignal = WritableSignal<boolean> & { toggle(): void };
```

A boolean signal with ``toggle()``. No injection context needed.

```ts
menuOpen = toggleSignal();
```

```html
<button (click)="menuOpen.toggle()">Menu</button>
```

#### loadingSignal

```ts
function loadingSignal<T>(source: Observable<T> | (() => Observable<T>), options?: SignalOptions & { keepData?: boolean }): Signal<LoadingState<T>> { ... }
```

The ``withLoading`` operator as a signal: ``{ loading: true }``, then ``{ loading: false, data }`` or ``{ loading: false, error }``.

With a function, the request runs again when the signals it reads change (the previous request is cancelled). With ``keepData``, the last data stays during the new request (``{ loading: true, data }``).

```ts
users = loadingSignal(this.http.get<User[]>('/users'));

userId = signal(1);
user = loadingSignal(() => this.http.get<User>(`/users/${this.userId()}`), { keepData: true });
```

```html
@if (users().loading) { Loading… } @else { {{ users().data?.length }} users }
```

#### storageSignal

```ts
function storageSignal<T>(key: string, initial: T, options?: { storage?: 'local' | 'session' }): WritableSignal<T> { ... }
```

A writable signal saved in ``localStorage`` (or ``sessionStorage``) as JSON, under ``key``. It starts with the saved value, or ``initial``. No injection context needed. On the server, or when the storage is blocked or full, it works as a plain signal.

```ts
theme = storageSignal<'light' | 'dark'>('theme', 'light');
```

#### mediaQuerySignal

```ts
function mediaQuerySignal(query: string, options?: SignalOptions): Signal<boolean> { ... }
```

``true`` while the media query matches. On the server, it's ``false``.

```ts
isMobile = mediaQuerySignal('(max-width: 600px)');
```

## Issue

LOOKING FOR MAINTAINER OR IF THERE IS AN ISSUE OR ANY IDEA TO ADD. PLEASE CREATE ISSUE IN GITHUB REPOSITORY.
