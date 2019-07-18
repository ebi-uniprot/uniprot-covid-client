/* eslint-disable @typescript-eslint/no-explicit-any */
const hasContent = (obj: any) => {
  return Object.values(obj).some(val => {
    if (Array.isArray(val)) {
      const valArray = val as any[];
      return valArray.length > 0;
    }
    if (typeof val === 'object' && val) {
      return Object.values(val).length > 0;
    }
    return false;
  });
};

export default hasContent;
