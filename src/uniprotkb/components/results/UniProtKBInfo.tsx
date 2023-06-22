import React, { Fragment } from 'react';

const UniProtKBInfo = () => (
  <Fragment>
    <section className="text-block">
    This site was created to provide pre-release access to UniProtKB data for the SARS-CoV-2 coronavirus and other entries relating to the COVID-19 outbreak.{' '}
    <span style={{
          color: '#c90a0a',
          fontStyle: 'italic'
        }}>
    This site will not be updated after release 2023_03, and it will be shut down on with 
    release 2023_04 scheduled for September 2023. Please refer to the main <a href="https://www.uniprot.org">UniProt website</a> for all entries related to COVID-19.
    </span>
    </section>
    <section className="text-block">
      This data can also be accessed via our FTP on{' '}
      <a
        href="ftp://ftp.uniprot.org/pub/databases/uniprot/pre_release/"
        style={{
          overflowWrap: 'anywhere',
        }}
      >
        ftp://ftp.uniprot.org/pub/databases/uniprot/pre_release/
      </a>
    </section>
    <section className="text-block">
      You can view our latest webinar about Sars-CoV-2 and this portal from{' '}
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.youtube.com/watch?v=EY69TjnVhRs"
      >
        here
      </a>
      , presented on the 2nd April 2020.
    </section>
    <section className="text-block">
      Please go to the <a href="//www.uniprot.org">UniProt.org</a> website for
      all other entries and functionalities.
    </section>
    <section className="text-block">
      You can view all COVID-19 related publications contributed by the
      community <a href="//community.uniprot.org/bbsub/covid.html">here</a>.
    </section>
    <section className="text-block">
      You can view all curated LitCovid COVID-19 related publications{' '}
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="//www.ncbi.nlm.nih.gov/research/coronavirus/docsum?text=protein%20or%20gene%20or%20structure"
      >
        here
      </a>
      .
    </section>
  </Fragment>
);

export default UniProtKBInfo;
