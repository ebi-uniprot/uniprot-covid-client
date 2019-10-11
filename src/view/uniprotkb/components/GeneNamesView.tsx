import React, { Fragment } from 'react';
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

const GeneNamesView: React.FC<{ geneNamesData: GeneNamesData }> = ({
  geneNamesData,
}) => (
  <Fragment>
    {geneNamesData.map((geneNames, index) => (
      <span key={geneNames.geneName.value}>
        {index > 0 ? ', ' : ''}
        <strong>{geneNames.geneName.value}</strong>
        {geneNames.synonyms && (
          <GeneAlternativeNamesView alternativeNames={geneNames.synonyms} />
        )}
        {geneNames.orfNames && (
          <GeneAlternativeNamesView alternativeNames={geneNames.orfNames} />
        )}
        {geneNames.orderedLocusNames && (
          <GeneAlternativeNamesView
            alternativeNames={geneNames.orderedLocusNames}
          />
        )}
      </span>
    ))}
  </Fragment>
);

export const GeneNamesListView: React.FC<{ geneNamesData: GeneNamesData }> = ({
  geneNamesData,
}) => (
  <Fragment>
    {geneNamesData.map(geneNames => {
      const infoData = [
        {
          title: 'Name',
          content: geneNames.geneName.value,
        },
        {
          title: 'Alternative names',
          content: (
            <Fragment>
              {geneNames.synonyms && (
                <div>
                  <GeneAlternativeNamesView
                    alternativeNames={geneNames.synonyms}
                    firstComma={false}
                  />
                </div>
              )}
              {geneNames.orfNames && (
                <div>
                  <GeneAlternativeNamesView
                    alternativeNames={geneNames.orfNames}
                    firstComma={false}
                  />
                </div>
              )}
              {geneNames.orderedLocusNames && (
                <div>
                  <GeneAlternativeNamesView
                    alternativeNames={geneNames.orderedLocusNames}
                    firstComma={false}
                  />
                </div>
              )}
            </Fragment>
          ),
        },
      ];
      return <InfoList infoData={infoData} key={geneNames.geneName.value} />;
    })}
  </Fragment>
);

export default GeneNamesView;
