import React, { Fragment } from 'react';

const UniProtKBInfo = () => (
  <Fragment>
    <section className="text-block">
      This page lists the latest available UniProtKB data relating to the
      COVID-19 outbreak, including protein entries for the SARS-CoV-2
      coronavirus. It will be updated as new information becomes available,
      independent of the general UniProt release schedule.
    </section>
    <section className="text-block">
      This data can also be accessed via our FTP on{' '}
      <a href="ftp://ftp.uniprot.org/pub/databases/uniprot/pre_release/">
        ftp://ftp.uniprot.org/pub/databases/uniprot/pre_release/
      </a>
    </section>
    <section className="text-block">
      Please go to the <a href="//www.uniprot.org">UniProt.org</a> website for all other entries and functionalities.
    </section>
  </Fragment>
);

export default UniProtKBInfo;
