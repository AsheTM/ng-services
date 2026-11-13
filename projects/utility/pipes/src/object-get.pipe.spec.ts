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

  it('should infer the type when the object type is known', () => {
    // GIVEN
    const settings: { theme: { color: string }, owner?: { name: string }, tags: string[] } = { theme: { color: 'red' }, tags: ['a'] };

    // WHEN
    const color: string | undefined = pipe.transform(settings, 'theme.color');
    const owner: string = pipe.transform(settings, 'owner.name', 'nobody');
    const tag: string | undefined = pipe.transform(settings, 'tags.0');

    // THEN
    expect([color, owner, tag]).toEqual(['red', 'nobody', 'a']);
    expect(pipe.transform(settings, 'theme.size')).toBeUndefined();
  });
});
