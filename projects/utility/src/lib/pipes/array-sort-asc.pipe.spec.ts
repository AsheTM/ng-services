import { ArraySortAsc } from './array-sort-asc.pipe';


describe('ArraySortAsc', () => {
  const pipe = new ArraySortAsc();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should sort array with \'asc\' direction', () => {
    const list: number[] = [10, 5];
    const sortedList: number[] = pipe.transform(list);

    expect(sortedList.length).toBe(list.length);
    expect(sortedList[0]).toBe(list[1]);
    expect(sortedList[1]).toBe(list[0]);
  });

  it('should sort array of object with \'asc\' direction', () => {
    const list: Record<'a', number>[] = [{ a: 10 }, { a: 1 }];
    const sortedList: Record<'a', number>[] = pipe.transform(list, 'a');

    expect(sortedList.length).toBe(list.length);
    expect(sortedList[0].a).toBe(list[1].a);
    expect(sortedList[1].a).toBe(list[0].a);
  });
});
