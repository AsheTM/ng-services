import { ArrayShuffle } from './array-shuffle.pipe';


describe('ArrayShuffle', () => {
  const pipe = new ArrayShuffle();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should shuffle array', () => {
    const list: number[] = [10, 5];
    const shuffledList: number[] = pipe.transform(list);
    const randomIndex: number = Math.floor(Math.random() * list.length);
    const randomItem: number = list[randomIndex];
    const isRandomItemIncluded: boolean = shuffledList.some((item: number) => item === randomItem)

    expect(shuffledList.length).toBe(list.length);
    expect(isRandomItemIncluded).toBeTrue();
  });
});
