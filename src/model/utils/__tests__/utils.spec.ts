import { hasContent, transfromProperties, getPropertyValue } from '../utils';
import { PropertyKey } from '../../types/modelTypes';

describe('Model Utils', () => {
  it('should check whether an object is empty', () => {
    expect(hasContent({})).toBeFalsy();
  });

  it('should check whether a nested object has content', () => {
    expect(hasContent({ key: { key1: 'something' } })).toBeTruthy();
  });

  it('should check whether a nested object has content', () => {
    expect(hasContent({ key: { key1: undefined } })).toBeTruthy();
  });

  it('should check whether an array has content', () => {
    expect(hasContent({ key: ['blah'] })).toBeTruthy();
  });

  it('should check whether an array has no content', () => {
    expect(hasContent({ key: [] })).toBeFalsy();
  });

  it('should check whether a nested Map has content', () => {
    expect(hasContent({ key: new Map([['a', 'b']]) })).toBeTruthy();
  });

  it('should check whether a nested Map has no content', () => {
    expect(hasContent({ key: new Map() })).toBeFalsy();
  });
});

const testingProperties = [
  { key: PropertyKey.Project, value: 'foo' },
  { key: PropertyKey.GeneName, value: 'A1' },
];

describe('transformProperties', () => {
  test('should transform array of properties to object', () => {
    expect(transfromProperties(testingProperties)).toEqual({
      [PropertyKey.Project]: 'foo',
      [PropertyKey.GeneName]: 'A1',
    });
  });
});

describe('getPropertyValue', () => {
  test('should find and return property value', () => {
    expect(getPropertyValue(testingProperties, PropertyKey.GeneName)).toEqual(
      'A1'
    );
  });
});
