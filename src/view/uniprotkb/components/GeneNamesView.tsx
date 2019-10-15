import React, { Fragment } from 'react';
import { v1 } from 'uuid';
import { InfoList } from 'franklin-sites';
import { GeneNamesData } from '../../../model/uniprotkb/sections/NamesAndTaxonomyConverter';

export const GeneAlternativeNamesView: React.FC<{
  alternativeNames: { value: string }[];
  firstComma?: boolean;
}> = ({ alternativeNames, firstComma = true }) => (
  <Fragment>
    {alternativeNames.map((altName, i) => (
      <Fragment key={altName.value}>
        {firstComma || (!firstComma && i > 0) ? ', ' : ''}
        {altName.value}
      </Fragment>
    ))}
  </Fragment>
);

const GeneNamesView: React.FC<{
  geneNamesData: GeneNamesData;
  isFlat?: boolean;
}> = ({ geneNamesData, isFlat = false }) => (
  <Fragment>
    {geneNamesData.map(geneNames => {
      const infoData = [
        {
          title: 'Name',
          content: geneNames.geneName && (
            <Fragment>{geneNames.geneName.value}</Fragment>
          ),
        },
      ];
      if (geneNames.synonyms) {
        infoData.push({
          title: 'Synonyms',
          content: (
            <GeneAlternativeNamesView
              alternativeNames={geneNames.synonyms}
              firstComma={false}
            />
          ),
        });
      }
      if (geneNames.orfNames) {
        infoData.push({
          title: 'ORF names',
          content: (
            <GeneAlternativeNamesView
              alternativeNames={geneNames.orfNames}
              firstComma={false}
            />
          ),
        });
      }
      if (geneNames.orderedLocusNames) {
        infoData.push({
          title: 'Ordered locus names',
          content: (
            <GeneAlternativeNamesView
              alternativeNames={geneNames.orderedLocusNames}
              firstComma={false}
            />
          ),
        });
      }
      return (
        <InfoList
          infoData={infoData}
          key={geneNames.geneName ? geneNames.geneName.value : v1()}
          isCompact={isFlat}
          highlightFirstItem={isFlat}
        />
      );
    })}
  </Fragment>
);

export default GeneNamesView;
