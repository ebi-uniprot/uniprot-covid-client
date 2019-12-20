import React, { Fragment } from 'react';
import { ExpandableList } from 'franklin-sites';
import {
  GoTerm,
  GO_ASPECT,
} from '../../../model/uniprotkb/sections/FunctionConverter';
import UniProtEvidenceTag from '../../../components/UniProtEvidenceTag';

export const GOTermsView: React.FC<{ data: GoTerm[] }> = ({ data }) => (
  <section className="text-block">
    <ExpandableList descriptionString="terms">
      {data.map(term => ({
        id: term.id,
        content: (
          <Fragment>
            <a href={`//www.ebi.ac.uk/QuickGO/term/${term.id}`}>
              {term.termDescription}
            </a>
            {/* TODO: currently not displaying the GoEvidenceType property
        which will have to be displayed like an evidence tag */}
            {term.evidences && (
              <UniProtEvidenceTag evidences={term.evidences} />
            )}
          </Fragment>
        ),
      }))}
    </ExpandableList>
  </section>
);

const GOView: React.FC<{ data: Map<GO_ASPECT, GoTerm[]> }> = ({ data }) => (
  <Fragment>
    {Array.from(data.keys()).map(aspect => (
      <section className="text-block" key={aspect.toString()}>
        <h5>{aspect.toString()}</h5>
        {data.get(aspect) && (
          <GOTermsView data={data.get(aspect) as GoTerm[]} />
        )}
      </section>
    ))}
  </Fragment>
);

export default GOView;
