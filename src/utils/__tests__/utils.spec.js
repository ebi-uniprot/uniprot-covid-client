import { serializableDeepCopy, serializableDeepAreEqual, removeProperty } from '../utils';

test('serializableDeepCopy returns a copy that is not a reference ', () => {
  const obj = { foo: { bar: [1] } };
  const objCopy = serializableDeepCopy(obj);
  expect(objCopy).not.toBe(obj);
  expect(objCopy).toEqual(obj);
});

test('serializableDeepAreEqual returns true if has recursively equal attributes for obj1 and obj2 ', () => {
  const obj1 = { foo: { bar: [1] } };
  const obj2 = { foo: { bar: [1] } };
  expect(serializableDeepAreEqual(obj1, obj2)).toBe(true);
});

test('serializableDeepAreEqual returns false if has recursively unequal attributes for obj1 and obj2 ', () => {
  const obj1 = { foo: { bar: [1] } };
  const obj2 = { foo: { bar: [2] } };
  expect(serializableDeepAreEqual(obj1, obj2)).toBe(false);
});

test('removeProperty removes only specified property and returns a deep copy of object ', () => {
  const obj = { foo: { bar: [1] }, baz: -1 };
  const objWithoutProprety = removeProperty(obj, 'baz');
  expect(objWithoutProprety).toEqual({ foo: { bar: [1] } });
  expect(objWithoutProprety).not.toBe(obj);
});
