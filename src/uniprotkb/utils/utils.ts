import { uniq } from 'lodash';
import UniProtKBEntryConfig from '../config/UniProtEntryConfig';
import { UniProtkbUIModel } from '../adapters/UniProtkbConverter';
import { GeneNamesData } from '../adapters/NamesAndTaxonomyConverter';
import { Property, PropertyKey } from '../types/modelTypes';

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

export const flattenGeneNameData = (geneNamesData: GeneNamesData) => {
  const geneNames: string[] = [];
  geneNamesData.forEach(
    ({ geneName, synonyms = [], orfNames = [], orderedLocusNames = [] }) => {
      if (geneName) {
        geneNames.push(geneName.value);
      }
      [synonyms, orfNames, orderedLocusNames].forEach(names => {
        names.forEach(({ value }) => {
          geneNames.push(value);
        });
      });
    }
  );
  return uniq(geneNames);
};

export const transfromProperties = (properties: Property[]) => {
  const o: { [key: string]: string } = {};
  properties.forEach(({ key, value }) => {
    if (key && value) {
      o[key] = value;
    }
  });
  return o;
};

// This function is useful because our API returns arrays of objects of shape: { key: x, value: y}
export const getPropertyValue = (
  properties: Property[],
  propertyKey: PropertyKey
) => {
  const found = properties.find(({ key }) => key === propertyKey);
  return found ? found.value : null;
};
