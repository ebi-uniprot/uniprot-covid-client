import React, { Fragment, memo } from 'react';
import { Card, DownloadIcon, DropdownButton } from 'franklin-sites';
import UniProtKBEntryConfig from '../view/uniprotkb/UniProtEntryConfig';
import { ProteinOverview } from '../view/uniprotkb/components/ProteinOverviewView';
import { UniProtkbUIModel } from '../model/uniprotkb/UniProtkbConverter';
import UniProtTitle from '../view/uniprotkb/components/UniProtTitle';

type EntryMainProps = {
  transformedData: UniProtkbUIModel;
};

function arePropsEqual(prevProps: EntryMainProps, nextProps: EntryMainProps) {
  // Do NOT re-render the page, as long as the 'accession' value is the same.
  return (
    prevProps.transformedData.primaryAccession ===
    nextProps.transformedData.primaryAccession
  );
}

const EntryMain: React.FC<EntryMainProps> = ({ transformedData }) => (
  <Fragment>
    <div className="button-group">
      <button type="button" className="button tertiary">
        Blast
      </button>
      <button type="button" className="button tertiary">
        Align
      </button>
      <DropdownButton
        label={
          <Fragment>
            <DownloadIcon />
            Download
          </Fragment>
        }
        className="tertiary"
        // onSelect={action('onSelect')}
      >
        <div className="dropdown-menu__content">
          <ul>
            <li>
              <a href="//www.ensembl.org">Text</a>
            </li>
            <li>
              <a href="//www.ensembl.org">FASTA(canonical)</a>
            </li>
            <li>
              <a href="//www.ensembl.org">FASTA(canonical & isoform)</a>
            </li>
            <li>
              <a href="//www.ensembl.org">XML</a>
            </li>
            <li>
              <a href="//www.ensembl.org">RDF / XML</a>
            </li>
            <li>
              <a href="//www.ensembl.org">GFF</a>
            </li>
          </ul>
        </div>
      </DropdownButton>
      <button type="button" className="button tertiary">
        Add
      </button>
    </div>
    <Card
      title={
        <UniProtTitle
          primaryAccession={transformedData.primaryAccession}
          entryType={transformedData.entryType}
          uniProtId={transformedData.uniProtId}
        />
      }
    >
      <ProteinOverview transformedData={transformedData} />
    </Card>
    {UniProtKBEntryConfig.map(({ sectionContent }) =>
      sectionContent(transformedData)
    )}
  </Fragment>
);

export default memo(EntryMain, arePropsEqual);
