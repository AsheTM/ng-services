import { ObjectGet } from './object-get.pipe';


describe('ObjectGet', () => {
  const pipe = new ObjectGet();
  const user: Record<string, unknown> = { name: 'John', address: { city: 'Paris' }, tags: [{ label: 'admin' }], age: 0 };

  it('should read a nested value by path', () => {
    // GIVEN
    // WHEN
    const results: unknown[] = [pipe.transform(user, 'address.city'), pipe.transform(user, 'tags.0.label'), pipe.transform(user, ['tags', 0, 'label'])];

    // THEN
    expect(results).toEqual(['Paris', 'admin', 'admin']);
  });

  it('should keep falsy values', () => {
    // GIVEN
    // WHEN
    const result: unknown = pipe.transform(user, 'age', 99);

    // THEN
    expect(result).toBe(0);
  });

  it('should return the fallback (or undefined) when the path is missing', () => {
    // GIVEN
    // WHEN
    const results: unknown[] = [pipe.transform(user, 'address.zip'), pipe.transform(user, 'company.name', 'none'), pipe.transform(null, 'a.b', 'none')];

    // THEN
    expect(results).toEqual([undefined, 'none', 'none']);
  });
});
