import { ArraySort } from './array-sort.pipe';


describe('ArraySort', () => {
  const pipe = new ArraySort();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should sort array with default \'asc\' direction', () => {
    const list: number[] = [10, 5];
    const sortedList: number[] = pipe.transform(list);

    expect(sortedList.length).toBe(list.length);
    expect(sortedList[0]).toBe(list[1]);
    expect(sortedList[1]).toBe(list[0]);
  });

  it('should sort array with \'asc\' direction', () => {
    const list: number[] = [10, 5];
    const sortedList: number[] = pipe.transform(list, 'asc');

    expect(sortedList.length).toBe(list.length);
    expect(sortedList[0]).toBe(list[1]);
    expect(sortedList[1]).toBe(list[0]);
  });

  it('should sort array with \'desc\' direction', () => {
    const list: number[] = [5, 10];
    const sortedList: number[] = pipe.transform(list, 'desc');

    expect(sortedList.length).toBe(list.length);
    expect(sortedList[0]).toBe(list[1]);
    expect(sortedList[1]).toBe(list[0]);
  });

  it('should sort array of object with \'asc\' direction', () => {
    const list: Record<'a', number>[] = [{ a: 1 }, { a: 2 }];
    const sortedList: Record<'a', number>[] = pipe.transform(list, 'asc', 'a');

    expect(sortedList.length).toBe(list.length);
    expect(sortedList[0].a).toBe(list[0].a);
    expect(sortedList[1].a).toBe(list[1].a);
  });

  it('should sort array of object with \'desc\' direction', () => {
    const list: Record<'a', number>[] = [{ a: 1 }, { a: 2 }];
    const sortedList: Record<'a', number>[] = pipe.transform(list, 'desc', 'a');

    expect(sortedList.length).toBe(list.length);
    expect(sortedList[0].a).toBe(list[1].a);
    expect(sortedList[1].a).toBe(list[0].a);
  });
});
