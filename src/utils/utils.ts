export const serializableDeepCopy = (x: any) => JSON.parse(JSON.stringify(x));

export const serializableDeepAreEqual = (obj1: any, obj2: any) =>
  JSON.stringify(obj1) === JSON.stringify(obj2);

export const removeProperty = (obj: any, property: any) => {
  const { [property]: unwantedProperty, ...objWithoutProperty } = obj;
  return objWithoutProperty;
};

export const formatLargeNumber = (x: number) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const loadWebComponent = (name: string, className: Function) => {
  if (!window.customElements.get(name)) {
    window.customElements.define(name, className);
  }
};
