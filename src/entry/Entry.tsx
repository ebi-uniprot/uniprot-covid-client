import React, { Fragment } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import useDataApi from '../utils/useDataApi';
import UniProtKBEntryConfig from './uniprotkb/UniProtEntryConfig';
import apiUrls from '../utils/apiUrls';
import { ProteinOverview } from '../model/ProteinOverview';
import { FreeText } from '../model/FreeText';
import { CommentType } from '../model/types/commentType';
import XRef from '../model/XRef';
import { Card } from 'franklin-sites';
import { SequenceViewEntry } from '../model/SequenceView';
import EntrySectionType from '../model/types/EntrySection';
import { KeywordData } from '../model/Keyword';
import FeaturesView from '../model/FeaturesView';
import FeatureTypes from '../model/types/featureTypes';
import DiseaseInvolvement from '../model/DiseaseInvolvement';

interface MatchParams {
  accession: string;
}

interface EntryProps extends RouteComponentProps<MatchParams> {}

// TODO this needs to be removed once added
// export const entrySectionToKeywordCategories = new Map<
//   EntrySection,
//   KeywordCategory[]
// >();
// entrySectionToKeywordCategories.set(EntrySection.Expression, [
//   KeywordCategory.DEVELOPMENTAL_STAGE,
// ]);
// entrySectionToKeywordCategories.set(EntrySection.ProteinProcessing, [
//   KeywordCategory.PTM,
// ]);
// entrySectionToKeywordCategories.set(EntrySection.SubCellularLocation, [
//   KeywordCategory.CELLULAR_COMPONENT,
// ]);
// entrySectionToKeywordCategories.set(EntrySection.Miscellaneous, [
//   KeywordCategory.TECHNICAL_TERM,
// ]);
// entrySectionToKeywordCategories.set(EntrySection.PathologyAndBioTech, [
//   KeywordCategory.DISEASE,
// ]);
// entrySectionToKeywordCategories.set(EntrySection.FamilyAndDomains, [
//   KeywordCategory.DOMAIN,
// ]);
// entrySectionToKeywordCategories.set(EntrySection.Sequence, [
//   KeywordCategory.CODING_SEQUENCE_DIVERSITY,
// ]);
// entrySectionToKeywordCategories.set(EntrySection.Function, [
//   KeywordCategory.MOLECULAR_FUNCTION,
//   KeywordCategory.BIOLOGICAL_PROCESS,
//   KeywordCategory.LIGAND,
// ]);

const Entry: React.FC<EntryProps> = ({ match }) => {
  const url = apiUrls.entry(match.params.accession);
  const entryData = useDataApi(url);
  if (Object.keys(entryData).length <= 0) {
    return null;
  }

  const sectionArray = [];
  const inPageNavItems = [];
  // for (const [name, section] of UniProtKBEntryConfig) {
  //   const sectionContent = section(entryData);
  //   sectionContent &&
  //     sectionArray.push(
  //       <Card title={name} key={name}>
  //         {sectionContent}
  //       </Card>
  //     );
  //   inPageNavItems.push({
  //     id: name,
  //     name: name,
  //     disabled: sectionContent === null,
  //   });
  // }

  return (
    <Fragment>
      <ProteinOverview data={entryData} />

      {UniProtKBEntryConfig.map(({ name, sectionContent }) => {
        return (
          <Card title={name} key={name}>
            {sectionContent(entryData)}
          </Card>
        );
      })}

      {/* <Card title="PTM/Processing">
        <FeaturesView
          data={entryData}
          types={[
            FeatureTypes.INIT_MET,
            FeatureTypes.SIGNAL,
            FeatureTypes.TRANSIT,
            FeatureTypes.PROPEP,
            FeatureTypes.CHAIN,
            FeatureTypes.PEPTIDE,
            FeatureTypes.MOD_RES,
            FeatureTypes.LIPID,
            FeatureTypes.CARBOHYD,
            FeatureTypes.DISULFID,
            FeatureTypes.CROSSLNK,
          ]}
        />
      </Card>
      <Card title="Pathology & Biotech">
        <DiseaseInvolvement data={entryData} />
        <FeaturesView data={entryData} types={[FeatureTypes.MUTAGEN]} />
      </Card>
      <Card title="Expression">
        <h4>Tissue specificity</h4>
        <FreeText data={entryData} type={CommentType.TISSUE_SPECIFICITY} />
        <h4>Induction</h4>
        <FreeText data={entryData} type={CommentType.INDUCTION} />
        <Keyword data={entryData} section={EntrySectionType.Expression} />
        <XRef data={entryData} section={EntrySectionType.Expression} />
      </Card> */}
      {/* <Card title="Interaction" /> */}
      {/* <Card title="Structure">
        <FeaturesView
          data={entryData}
          types={[FeatureTypes.HELIX, FeatureTypes.TURN, FeatureTypes.STRAND]}
        />
      </Card> */}
      {/* <Card title="Family & Domains" /> */}
      {/* <Card title="Sequences">
        <SequenceViewEntry data={entryData} />
        <FeaturesView
          data={entryData}
          types={[
            FeatureTypes.COMPBIAS,
            FeatureTypes.NON_STD,
            FeatureTypes.UNSURE,
            FeatureTypes.CONFLICT,
            FeatureTypes.NON_CONS,
            FeatureTypes.NON_TER,
          ]}
        />
        <Keyword data={entryData} section={EntrySectionType.Sequence} />
        <XRef data={entryData} section={EntrySectionType.Sequence} />
      </Card> */}
      {/* <Card title="Similar Proteins" />
      <Card title="Cross-References" />
      <Card title="Entry Information" />
      <Card title="Miscellaneous" /> */}
    </Fragment>
  );
};

export default withRouter(Entry);
