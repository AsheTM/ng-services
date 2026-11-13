import { ArraySortDesc } from './array-sort-desc.pipe';


describe('ArraySortDesc', () => {
  const pipe = new ArraySortDesc();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should sort array with \'desc\' direction', () => {
    const list: number[] = [5, 10];
    const sortedList: number[] = pipe.transform(list);

    expect(sortedList.length).toBe(list.length);
    expect(sortedList[0]).toBe(list[1]);
    expect(sortedList[1]).toBe(list[0]);
  });

  it('should sort array of object with \'desc\' direction', () => {
    const list: Record<'a', number>[] = [{ a: 1 }, { a: 2 }];
    const sortedList: Record<'a', number>[] = pipe.transform(list, 'a');

    expect(sortedList.length).toBe(list.length);
    expect(sortedList[0].a).toBe(list[1].a);
    expect(sortedList[1].a).toBe(list[0].a);
  });
});
