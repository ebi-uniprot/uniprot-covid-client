export const serializableDeepCopy = (x: any) => JSON.parse(JSON.stringify(x));

export const serializableDeepAreEqual = (obj1: any, obj2: any) => JSON.stringify(obj1) === JSON.stringify(obj2);

export const removeProperty = (obj: any, property: any) => {
  const { [property]: unwantedProperty, ...objWithoutProperty } = obj;
  return objWithoutProperty;
};
