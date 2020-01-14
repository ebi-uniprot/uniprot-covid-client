import React, { Fragment } from 'react';
import { v1 } from 'uuid';
import { InfoList } from 'franklin-sites';
import { GeneNamesData } from '../../../model/uniprotkb/sections/NamesAndTaxonomyConverter';
import { NameWithEvidence } from './ProteinNamesView';
import { ValueWithEvidence } from '../../../model/types/modelTypes';

export const geneAlternativeNamesView = (
  alternativeNames: ValueWithEvidence[],
  firstComma: boolean = true
) => {
  return (
    <Fragment>
      {firstComma && ', '}
      {alternativeNames.map(altName => (
        <Fragment key={altName.value}>
          <NameWithEvidence data={altName} />
          {', '}
        </Fragment>
      ))}
    </Fragment>
  );
};

const GeneNamesView: React.FC<{
  geneNamesData: GeneNamesData;
  isCompact?: boolean;
}> = ({ geneNamesData, isCompact = false }) => (
  <Fragment>
    {geneNamesData.map(geneNames => {
      const infoData = [
        {
          title: 'Name',
          content: geneNames.geneName && (
            <Fragment>
              <NameWithEvidence data={geneNames.geneName} />
            </Fragment>
          ),
        },
      ];
      if (geneNames.synonyms) {
        infoData.push({
          title: 'Synonyms',
          content: (
            <Fragment>
              {geneAlternativeNamesView(geneNames.synonyms, false)}
            </Fragment>
          ),
        });
      }
      if (geneNames.orfNames) {
        infoData.push({
          title: 'ORF names',
          content: (
            <Fragment>
              {geneAlternativeNamesView(geneNames.orfNames, false)}
            </Fragment>
          ),
        });
      }
      if (geneNames.orderedLocusNames) {
        infoData.push({
          title: 'Ordered locus names',
          content: (
            <Fragment>
              {geneAlternativeNamesView(geneNames.orderedLocusNames, false)}
            </Fragment>
          ),
        });
      }
      return (
        <InfoList
          infoData={infoData}
          key={geneNames.geneName ? geneNames.geneName.value : v1()}
          isCompact={isCompact}
          highlightFirstItem={isCompact}
        />
      );
    })}
  </Fragment>
);

export default GeneNamesView;
