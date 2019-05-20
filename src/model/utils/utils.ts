export const isEmpty = (obj: any) => {
  return Object.values(obj).every(val => {
    if (Array.isArray(val)) {
      const valArray = val as any[];
      return valArray.length <= 0;
    }
    return false;
  });
};
