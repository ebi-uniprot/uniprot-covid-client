export const isEmpty = (obj: any) => {
  return Object.values(obj).every(val => {
    if (Array.isArray(val)) {
      const valArray = val as Array<any>;
      return valArray.length <= 0;
    } else {
      return false;
    }
  });
};
