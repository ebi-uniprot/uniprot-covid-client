export const serializableDeepCopy = x => JSON.parse(JSON.stringify(x));

export const serializableDeepAreEqual = (obj1, obj2) => JSON.stringify(obj1) === JSON.stringify(obj2);

export const removeProperty = (obj, property) => {
  const { [property]: unwantedProperty, ...objWithoutProperty } = obj;
  return objWithoutProperty;
};
