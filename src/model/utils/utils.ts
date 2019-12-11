import { UniProtkbUIModel } from '../uniprotkb/UniProtkbConverter';

/* eslint-disable @typescript-eslint/no-explicit-any */
export const hasContent = (obj: any) => {
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

export const hasExternalLinks = (transformedData: UniProtkbUIModel) =>
  Object.keys(transformedData).some(key => {
    const value = transformedData[key as keyof UniProtkbUIModel];
    return (
      typeof value === 'object' && value.xrefData && value.xrefData.length > 0
    );
  });
