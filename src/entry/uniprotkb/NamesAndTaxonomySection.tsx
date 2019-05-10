import React, { Fragment, FC } from 'react';
import { EntryProteinNames, ProteinNamesData } from '../../model/ProteinNames';

type data = ProteinNamesData;

const NamesAndTaxonomySection: FC<{ entryData: data }> = ({ entryData }) => (
  <Fragment>
    <EntryProteinNames data={entryData} />
  </Fragment>
);

export default NamesAndTaxonomySection;
