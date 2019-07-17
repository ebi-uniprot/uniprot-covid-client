export const serializableDeepCopy = (x: object) =>
  JSON.parse(JSON.stringify(x));

export const serializableDeepAreEqual = (obj1: object, obj2: object) =>
  JSON.stringify(obj1) === JSON.stringify(obj2);

export const removeProperty = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  obj: { [key: string]: any },
  property: string | number
): { [key: string]: object } => {
  const { [property]: unwantedProperty, ...objWithoutProperty } = obj;
  return objWithoutProperty;
};

export const formatLargeNumber = (x: number) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const loadWebComponent = (name: string, className: Function) => {
  if (window.customElements && !window.customElements.get(name)) {
    window.customElements.define(name, className);
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const flattenArrays = (arrays: any[][]) =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [].concat(...(arrays as any[]));
