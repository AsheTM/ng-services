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

  it('should keep the order of equal items', () => {
    // GIVEN
    const list: Record<'a' | 'id', number>[] = [{ a: 1, id: 1 }, { a: 0, id: 2 }, { a: 1, id: 3 }];

    // WHEN
    const sortedList: Record<'a' | 'id', number>[] = pipe.transform(list, 'asc', 'a');

    // THEN
    expect(sortedList.map((item: Record<'a' | 'id', number>) => item.id)).toEqual([2, 1, 3]);
  });

  it('should sort strings in both directions', () => {
    // GIVEN
    const list: string[] = ['b', 'c', 'a'];

    // WHEN
    const ascList: string[] = pipe.transform([...list], 'asc');
    const descList: string[] = pipe.transform([...list], 'desc');

    // THEN
    expect(ascList).toEqual(['a', 'b', 'c']);
    expect(descList).toEqual(['c', 'b', 'a']);
  });

  it('should not modify the list', () => {
    // GIVEN
    const list: number[] = [3, 1, 2];

    // WHEN
    const sortedList: number[] = pipe.transform(list);

    // THEN
    expect(sortedList).toEqual([1, 2, 3]);
    expect(list).toEqual([3, 1, 2]);
  });
});
