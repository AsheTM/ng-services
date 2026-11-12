import { ObjectHas } from './object-has.pipe';


describe('ObjectHas', () => {
  const pipe = new ObjectHas();
  const user: Record<string, unknown> = { address: { city: 'Paris', zip: undefined } };

  it('should be true when the path exists, even with an undefined value', () => {
    // GIVEN
    // WHEN
    const results: boolean[] = [pipe.transform(user, 'address'), pipe.transform(user, 'address.city'), pipe.transform(user, ['address', 'zip'])];

    // THEN
    expect(results).toEqual([true, true, true]);
  });

  it('should be false when the path is missing', () => {
    // GIVEN
    // WHEN
    const results: boolean[] = [pipe.transform(user, 'address.country'), pipe.transform(user, 'company.name'), pipe.transform(null, 'a'), pipe.transform(user, '')];

    // THEN
    expect(results).toEqual([false, false, false, false]);
  });
});
