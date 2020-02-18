import React, { Fragment } from 'react';
import { ExpandableList } from 'franklin-sites';
import {
  GoTerm,
  GroupedGoTerms,
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

const GOView: React.FC<{ data: GroupedGoTerms }> = ({ data }) => (
  <Fragment>
    {Object.entries(data).map(([aspect, terms]) => (
      <section className="text-block" key={aspect}>
        <h4>{aspect}</h4>
        {terms && <GOTermsView data={terms} />}
      </section>
    ))}
  </Fragment>
);

export default GOView;
