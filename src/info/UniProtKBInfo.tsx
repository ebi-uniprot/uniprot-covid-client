import React, { Fragment } from 'react';

const UniProtKBInfo = () => (
  <Fragment>
    <section className="text-block">
      This site provides the latest available pre-release UniProtKB data for the
      SARS-CoV-2 coronavirus and other entries relating to the COVID-19
      outbreak. Therefore, data and functionality provided here may differ from
      the main Uniprot.org website which is updated every eight weeks. This site
      will be updated as new relevant information becomes available, independent
      of the general UniProt release schedule.
    </section>
    <section className="text-block">
      This data can also be accessed via our FTP on{' '}
      <a href="ftp://ftp.uniprot.org/pub/databases/uniprot/pre_release/">
        ftp://ftp.uniprot.org/pub/databases/uniprot/pre_release/
      </a>
    </section>
    <section className="text-block">
      Please go to the <a href="//www.uniprot.org">UniProt.org</a> website for
      all other entries and functionalities.
    </section>
  </Fragment>
);

export default UniProtKBInfo;
