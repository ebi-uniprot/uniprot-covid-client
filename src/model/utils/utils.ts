import UniProtKBEntryConfig from '../../view/uniprotkb/UniProtEntryConfig';
import { UniProtkbUIModel } from '../uniprotkb/UniProtkbConverter';

/* eslint-disable @typescript-eslint/no-explicit-any */
export const hasContent = (obj: any) => {
  return Object.values(obj).some(val => {
    if (Array.isArray(val)) {
      const valArray = val as any[];
      return valArray.length > 0;
    }
    if (typeof val === 'object' && val) {
      if (val instanceof Map) {
        return Array.from(val.values()).some(
          value => value && value.length > 0
        );
      }
      return Object.values(val).length > 0;
    }
    return false;
  });
};

export const hasExternalLinks = (transformedData: UniProtkbUIModel) =>
  UniProtKBEntryConfig.some(({ name }) => {
    const data = transformedData[name];
    return typeof data.xrefData && data.xrefData.length > 0;
  });
