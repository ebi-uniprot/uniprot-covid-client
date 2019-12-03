/* eslint-disable @typescript-eslint/camelcase */
import React, { Fragment } from 'react';
import { ExpandableList } from 'franklin-sites';
import idx from 'idx';
import { Link } from 'react-router-dom';

import SimpleView from '../view/uniprotkb/components/SimpleView';
import ProteinNamesView, {
  NameWithEvidence,
} from '../view/uniprotkb/components/ProteinNamesView';
import OrganismView, {
  OrganismLineage,
  OrganismId,
} from '../view/uniprotkb/components/OrganismView';
import GeneNamesView, {
  geneAlternativeNamesView,
} from '../view/uniprotkb/components/GeneNamesView';
import { UniProtkbUIModel } from './uniprotkb/UniProtkbConverter';
import numberView, { Unit } from '../view/uniprotkb/components/NumberView';
import ProteomesView from '../view/uniprotkb/components/ProteomesView';
import FeaturesView from '../view/uniprotkb/components/FeaturesView';
import EntrySection from './types/EntrySection';
import {
  SequenceCautionView,
  MassSpectrometryView,
  RNAEditingView,
} from '../view/uniprotkb/components/SequenceView';
import { Flag } from './uniprotkb/sections/SequenceConverter';
import FeatureType from './types/FeatureType';
import FreeTextView, {
  TextView,
} from '../view/uniprotkb/components/FreeTextView';
import {
  AbsorptionView,
  KineticsView,
} from '../view/uniprotkb/FunctionSection';
import { FunctionUIModel } from './uniprotkb/sections/FunctionConverter';
import { Column } from './types/ColumnTypes';
import {
  CommentType,
  FreeText,
  Xref,
  InteractionComment,
  InteractionType,
} from './types/CommentTypes';
import AnnotationScoreDoughnutChart, {
  DoughnutChartSize,
} from '../view/uniprotkb/components/AnnotationScoreDoughnutChart';
import { ValueWithEvidence } from './types/modelTypes';
import { getAllKeywords } from './utils/KeywordsUtil';
import { KeywordList } from '../view/uniprotkb/components/KeywordView';
import { ReviewedUnreviewed } from '../view/uniprotkb/components/UniProtTitle';
import { XrefCategoryContent } from '../view/uniprotkb/components/XRefView';
import {
  databaseNameToCategory,
  getDatabaseNameToEntrySection,
  getDatabaseInfoByName,
} from '../data/database';

const getFeatureColumn = (type: FeatureType) => {
  return {
    label: type,
    render: (data: UniProtkbUIModel) => {
      const { featuresData } = data[EntrySection.Sequence];
      return (
        featuresData && (
          <FeaturesView
            features={featuresData.filter(feature => feature.type === type)}
          />
        )
      );
    },
  };
};

export const ColumnConfiguration = new Map<
  Column,
  {
    label: string;
    sortable?: boolean | undefined;
    render: (data: UniProtkbUIModel) => JSX.Element | string | undefined;
  }
>();

ColumnConfiguration.set(Column.accession, {
  label: 'Entry',
  sortable: true,
  render: (data: { primaryAccession: string; entryType: string }) => (
    <SimpleView
      termValue={`${data.primaryAccession} (${data.entryType})`}
      linkTo={`/uniprotkb/${data.primaryAccession}`}
    />
  ),
});

ColumnConfiguration.set(Column.id, {
  label: 'Entry Name',
  sortable: true,
  render: (data: { uniProtId: string }) => (
    <SimpleView termValue={data.uniProtId} />
  ),
});

ColumnConfiguration.set(Column.proteinName, {
  label: 'Protein names',
  sortable: true,
  render: data => {
    const { proteinNamesData } = data[EntrySection.NamesAndTaxonomy];
    return (
      proteinNamesData && (
        <ProteinNamesView proteinNames={proteinNamesData} isCompact />
      )
    );
  },
});

ColumnConfiguration.set(Column.geneNames, {
  label: 'Gene Names',
  sortable: true,
  render: data => {
    const { geneNamesData } = data[EntrySection.NamesAndTaxonomy];
    return (
      geneNamesData && <GeneNamesView geneNamesData={geneNamesData} isCompact />
    );
  },
});

ColumnConfiguration.set(Column.organism, {
  label: 'Organism',
  sortable: true,
  render: data => {
    const { organismData } = data[EntrySection.NamesAndTaxonomy];
    return organismData && <OrganismView data={organismData} />;
  },
});

ColumnConfiguration.set(Column.length, {
  label: 'Length',
  render: data => {
    const { sequence } = data[EntrySection.Sequence];
    return sequence && numberView({ value: sequence.length, unit: Unit.AA });
  },
});

ColumnConfiguration.set(Column.genePrimary, {
  label: 'Gene names (Primary)',
  render: data => {
    const { geneNamesData } = data[EntrySection.NamesAndTaxonomy];
    return (
      <Fragment>
        {geneNamesData &&
          geneNamesData.map(geneData => {
            return (
              geneData.geneName && (
                <div key={geneData.geneName.value}>
                  {geneData.geneName.value}
                </div>
              )
            );
          })}
      </Fragment>
    );
  },
});

ColumnConfiguration.set(Column.geneOln, {
  label: 'Gene names (Ordered locus)',
  render: data => {
    const { geneNamesData } = data[EntrySection.NamesAndTaxonomy];
    return (
      <Fragment>
        {geneNamesData &&
          geneNamesData.map(
            geneData =>
              geneData.orderedLocusNames && (
                <Fragment key={geneData.orderedLocusNames.join('')}>
                  {geneAlternativeNamesView(geneData.orderedLocusNames, false)}
                </Fragment>
              )
          )}
      </Fragment>
    );
  },
});

ColumnConfiguration.set(Column.geneOrf, {
  label: 'Gene names (ORF)',
  render: data => {
    const { geneNamesData } = data[EntrySection.NamesAndTaxonomy];
    return (
      <Fragment>
        {geneNamesData &&
          geneNamesData.map(
            geneData =>
              geneData.orfNames && (
                <Fragment key={geneData.orfNames.join('')}>
                  {geneAlternativeNamesView(geneData.orfNames, false)}
                </Fragment>
              )
          )}
      </Fragment>
    );
  },
});

ColumnConfiguration.set(Column.geneSynonym, {
  label: 'Gene names (Synonyms)',
  render: data => {
    const { geneNamesData } = data[EntrySection.NamesAndTaxonomy];
    return (
      <Fragment>
        {geneNamesData &&
          geneNamesData.map(
            geneData =>
              geneData.synonyms && (
                <Fragment key={geneData.synonyms.join('')}>
                  {geneAlternativeNamesView(geneData.synonyms, false)}
                </Fragment>
              )
          )}
      </Fragment>
    );
  },
});
ColumnConfiguration.set(Column.organismId, {
  label: 'Organism',
  render: data => {
    const { organismData } = data[EntrySection.NamesAndTaxonomy];
    return organismData && <OrganismId taxonId={organismData.taxonId} />;
  },
});

ColumnConfiguration.set(Column.proteinName, {
  label: 'Protein names',
  render: data => {
    const { proteinNamesData } = data[EntrySection.NamesAndTaxonomy];
    return (
      proteinNamesData && (
        <ProteinNamesView proteinNames={proteinNamesData} isCompact />
      )
    );
  },
});

ColumnConfiguration.set(Column.drProteomes, {
  label: 'Proteomes',
  render: data => {
    const { proteomesData } = data[EntrySection.NamesAndTaxonomy];
    return proteomesData && <ProteomesView data={proteomesData} isCompact />;
  },
});
ColumnConfiguration.set(Column.lineage, {
  label: 'Lineage',
  render: data => {
    const { organismData } = data[EntrySection.NamesAndTaxonomy];
    return (
      organismData &&
      organismData.lineage && <OrganismLineage lineage={organismData.lineage} />
    );
  },
});
ColumnConfiguration.set(Column.organismHost, {
  label: 'Virus hosts',
  render: data => {
    const { organismHosts } = data[EntrySection.NamesAndTaxonomy];
    return (
      organismHosts && (
        <Fragment>
          {organismHosts.map(host => (
            <p key={host.taxonId}>
              <OrganismView data={host} />
            </p>
          ))}
        </Fragment>
      )
    );
  },
});

// TODO split isoforms from main sequence view
// cc:alternative_products ,
ColumnConfiguration.set(Column.ftVarSeq, {
  label: 'Alternative sequence',
  render: data => {
    const { featuresData } = data[EntrySection.Sequence];
    return (
      <Fragment>
        {featuresData && <FeaturesView features={featuresData} />}
      </Fragment>
    );
  },
});
ColumnConfiguration.set(Column.fragment, {
  label: 'Fragment',
  render: data => {
    const { flag } = data[EntrySection.Sequence];
    const isFragment =
      flag &&
      [
        Flag.FRAGMENT,
        Flag.FRAGMENTS,
        Flag.FRAGMENTS_PRECURSOR,
        Flag.FRAGMENT_PRECURSOR,
      ].includes(flag);
    return flag && <Fragment>{isFragment ? flag : 'N'}</Fragment>;
  },
});
// gene_location ,  "Invalid fields parameter value 'gene_location'"
ColumnConfiguration.set(Column.mass, {
  label: 'Mass',
  render: data => {
    const { molWeight } = data[EntrySection.Sequence];
    return numberView({ value: molWeight, unit: Unit.DA });
  },
});

ColumnConfiguration.set(Column.ccMassSpectrometry, {
  label: 'Mass Spectrometry',
  render: data => {
    const { massSpectrometry } = data[EntrySection.Sequence];
    return massSpectrometry && <MassSpectrometryView data={massSpectrometry} />;
  },
});

// ft:variant ,
ColumnConfiguration.set(
  Column.ftNonCon,
  getFeatureColumn(FeatureType.NON_CONS)
);
ColumnConfiguration.set(Column.ftNonStd, getFeatureColumn(FeatureType.NON_STD));
ColumnConfiguration.set(Column.ftNonTer, getFeatureColumn(FeatureType.NON_TER));

ColumnConfiguration.set(Column.ccPolymorphism, {
  label: 'Polymorphysm',
  render: data => {
    const { polymorphysm } = data[EntrySection.Sequence];
    return polymorphysm && <FreeTextView comments={polymorphysm} />;
  },
});

ColumnConfiguration.set(Column.ccRnaEditing, {
  label: 'RNA Editing',
  render: data => {
    const { rnaEditing } = data[EntrySection.Sequence];
    return rnaEditing && <RNAEditingView data={rnaEditing} />;
  },
});
// sequence ,
ColumnConfiguration.set(Column.errorGmodelPred, {
  label: 'Sequence Caution',
  render: data => {
    const { sequenceCaution } = data[EntrySection.Sequence];
    return sequenceCaution && <SequenceCautionView data={sequenceCaution} />;
  },
});

ColumnConfiguration.set(
  Column.ftConflict,
  getFeatureColumn(FeatureType.CONFLICT)
);
ColumnConfiguration.set(Column.ftUnsure, getFeatureColumn(FeatureType.UNSURE));
ColumnConfiguration.set(Column.sequenceVersion, {
  label: 'Sequence Version',
  render: data => {
    const { entryAudit } = data[EntrySection.Sequence];
    return entryAudit && <span>{entryAudit.sequenceVersion}</span>;
  },
});
ColumnConfiguration.set(Column.absorption, {
  label: 'Absorption',
  render: data => {
    const { bioPhysicoChemicalProperties } = data[
      EntrySection.Function
    ] as FunctionUIModel;
    return (
      bioPhysicoChemicalProperties.absorption && (
        <AbsorptionView data={bioPhysicoChemicalProperties.absorption} />
      )
    );
  },
});
ColumnConfiguration.set(
  Column.ftActSite,
  getFeatureColumn(FeatureType.ACT_SITE)
);
ColumnConfiguration.set(
  Column.ftBinding,
  getFeatureColumn(FeatureType.BINDING)
);
ColumnConfiguration.set(Column.ftCaBind, getFeatureColumn(FeatureType.CA_BIND));
// cc:catalytic_activity ,
// cc:cofactor ,
ColumnConfiguration.set(
  Column.ftDnaBind,
  getFeatureColumn(FeatureType.DNA_BIND)
);
ColumnConfiguration.set(Column.ec, {
  label: 'EC Number',
  render: data => {
    const { proteinNamesData } = data[EntrySection.NamesAndTaxonomy];
    const ecNumbers = idx(
      proteinNamesData,
      proteinName => proteinName.recommendedName.ecNumbers
    ) as ValueWithEvidence[];
    return (
      ecNumbers && (
        <Fragment>
          {ecNumbers.map(ecNumber => (
            <NameWithEvidence data={ecNumber} key={ecNumber.value} />
          ))}
        </Fragment>
      )
    );
  },
});
// ec ,
// "cc_activity_regulation"
ColumnConfiguration.set(Column.ccEnzymeRegulation, {
  label: 'Enzyme Regulation',
  render: data => {
    const activityRegulationComments = data[
      EntrySection.Function
    ].commentsData.get(CommentType.ACTIVITY_REGULATION) as FreeText[];
    return (
      activityRegulationComments && (
        <FreeTextView comments={activityRegulationComments} />
      )
    );
  },
});
ColumnConfiguration.set(Column.ccFunction, {
  label: 'Function',
  render: data => {
    const functionComments = data[EntrySection.Function].commentsData.get(
      CommentType.FUNCTION
    ) as FreeText[];
    return functionComments && <FreeTextView comments={functionComments} />;
  },
});
ColumnConfiguration.set(Column.kinetics, {
  label: 'Kinetics',
  render: data => {
    const { bioPhysicoChemicalProperties } = data[
      EntrySection.Function
    ] as FunctionUIModel;
    return (
      bioPhysicoChemicalProperties.kinetics && (
        <KineticsView data={bioPhysicoChemicalProperties.kinetics} />
      )
    );
  },
});
ColumnConfiguration.set(Column.ftMetal, getFeatureColumn(FeatureType.METAL));
ColumnConfiguration.set(
  Column.ftNpBind,
  getFeatureColumn(FeatureType.NP_BINDL)
);
ColumnConfiguration.set(Column.ccPathway, {
  label: 'Pathway',
  render: data => {
    const pathwayComments = data[EntrySection.Function].commentsData.get(
      CommentType.PATHWAY
    ) as FreeText[];
    return pathwayComments && <FreeTextView comments={pathwayComments} />;
  },
});
ColumnConfiguration.set(Column.phDependence, {
  label: 'pH Dependence',
  render: data => {
    const { bioPhysicoChemicalProperties } = data[
      EntrySection.Function
    ] as FunctionUIModel;
    return (
      bioPhysicoChemicalProperties.pHDependence && (
        <TextView comments={bioPhysicoChemicalProperties.pHDependence} />
      )
    );
  },
});
ColumnConfiguration.set(Column.redoxPotential, {
  label: 'Redox Potential',
  render: data => {
    const { bioPhysicoChemicalProperties } = data[
      EntrySection.Function
    ] as FunctionUIModel;
    return (
      bioPhysicoChemicalProperties.redoxPotential && (
        <TextView comments={bioPhysicoChemicalProperties.redoxPotential} />
      )
    );
  },
});
ColumnConfiguration.set(Column.ftSite, getFeatureColumn(FeatureType.SITE));
ColumnConfiguration.set(Column.tempDependence, {
  label: 'Temperature Dependence',
  render: data => {
    const { bioPhysicoChemicalProperties } = data[
      EntrySection.Function
    ] as FunctionUIModel;
    return (
      bioPhysicoChemicalProperties.temperatureDependence && (
        <TextView
          comments={bioPhysicoChemicalProperties.temperatureDependence}
        />
      )
    );
  },
});
ColumnConfiguration.set(Column.score, {
  label: 'Score',
  render: data => (
    <AnnotationScoreDoughnutChart
      score={data.annotationScore}
      size={DoughnutChartSize.medium}
    />
  ),
});
ColumnConfiguration.set(Column.ccSequenceCaution, {
  label: 'Sequence Caution',
  render: data => {
    const { sequenceCaution } = data[EntrySection.Sequence];
    return sequenceCaution && <SequenceCautionView data={sequenceCaution} />;
  },
});
// feature ,
ColumnConfiguration.set(Column.keyword, {
  label: 'Keywords',
  render: data => {
    const keywords = getAllKeywords(data);
    return <KeywordList keywords={keywords} />;
  },
});
ColumnConfiguration.set(Column.keywordid, {
  label: 'Keyword IDs',
  render: data => {
    const keywords = getAllKeywords(data);
    return <KeywordList keywords={keywords} idOnly />;
  },
});
// matched_text: this field is not provided anymore ,
ColumnConfiguration.set(Column.ccMiscellaneous, {
  label: 'Miscellaneous [CC]',
  render: data => {
    const miscellaneousComments = data[EntrySection.Function].commentsData.get(
      CommentType.MISCELLANEOUS
    ) as FreeText[];
    return (
      miscellaneousComments && <FreeTextView comments={miscellaneousComments} />
    );
  },
});
ColumnConfiguration.set(Column.proteinExistence, {
  label: 'Protein existence',
  render: data => data.proteinExistence,
});
ColumnConfiguration.set(Column.reviewed, {
  label: '',
  render: data => <ReviewedUnreviewed entryType={data.entryType} />,
});
// tools: UX review is this needed?? ,
// uniparc_id: leo re-indexing today 02/12/2019,
ColumnConfiguration.set(Column.ccInteraction, {
  label: '',
  render: data => {
    const interactionComments = data[EntrySection.Interaction].commentsData.get(
      CommentType.INTERACTION
    ) as InteractionComment[];
    return (
      interactionComments && (
        <Fragment>
          {interactionComments.map(interactionCC =>
            interactionCC.interactions.map(interaction => (
              <div
                key={
                  interaction.type === InteractionType.SELF
                    ? 'self'
                    : interaction.uniProtAccession
                }
              >
                {interaction.type === InteractionType.SELF ? (
                  'Itself'
                ) : (
                  <Link to={`/uniprotkb/${interaction.uniProtAccession}`}>
                    {interaction.uniProtAccession}
                  </Link>
                )}
              </div>
            ))
          )}
        </Fragment>
      )
    );
  },
});
// cc:subunit ,
// cc:developmental_stage ,
// cc:induction ,
// cc:tissue_specificity ,
// go_p ,
// go_c ,
// go ,
// go_f ,
// go_id ,
// cc:allergen ,
// cc:biotechnology ,
// cc:disruption_phenotype ,
// cc:disease ,
ColumnConfiguration.set(
  Column.ftMutagen,
  getFeatureColumn(FeatureType.MUTAGEN)
);
// cc:pharmaceutical ,
// cc:toxic_dose ,
ColumnConfiguration.set(
  Column.ftIntramem,
  getFeatureColumn(FeatureType.INTRAMEM)
);
// cc:subcellular_location ,
ColumnConfiguration.set(
  Column.ftTopDom,
  getFeatureColumn(FeatureType.TOPO_DOM)
);
ColumnConfiguration.set(
  Column.ftTransmem,
  getFeatureColumn(FeatureType.TRANSMEM)
);
ColumnConfiguration.set(Column.ftChain, getFeatureColumn(FeatureType.CHAIN));
ColumnConfiguration.set(
  Column.ftCrosslnk,
  getFeatureColumn(FeatureType.CROSSLNK)
);
ColumnConfiguration.set(
  Column.ftDisulfide,
  getFeatureColumn(FeatureType.DISULFID)
);
ColumnConfiguration.set(
  Column.ftCarbohyd,
  getFeatureColumn(FeatureType.CARBOHYD)
);
ColumnConfiguration.set(
  Column.ftInitMet,
  getFeatureColumn(FeatureType.INIT_MET)
);
ColumnConfiguration.set(Column.ftLipid, getFeatureColumn(FeatureType.LIPID));
ColumnConfiguration.set(Column.ftModRes, getFeatureColumn(FeatureType.MOD_RES));
ColumnConfiguration.set(
  Column.ftPeptide,
  getFeatureColumn(FeatureType.PEPTIDE)
);
// cc:ptm ,
ColumnConfiguration.set(Column.ftPropep, getFeatureColumn(FeatureType.PROPEP));
ColumnConfiguration.set(Column.ftSignal, getFeatureColumn(FeatureType.SIGNAL));
ColumnConfiguration.set(
  Column.ftTransit,
  getFeatureColumn(FeatureType.TRANSIT)
);
// 3d ,
ColumnConfiguration.set(Column.ftStrand, getFeatureColumn(FeatureType.STRAND));
ColumnConfiguration.set(Column.ftHelix, getFeatureColumn(FeatureType.HELIX));
ColumnConfiguration.set(Column.ftTurn, getFeatureColumn(FeatureType.TURN));
ColumnConfiguration.set(Column.pmId, {
  label: 'PubMed ID',
  render: data => {
    const ids = data.references.reduce<Xref[]>((acc, citation) => {
      const xrefs = citation.citation.citationXrefs;
      if (xrefs) {
        acc.push(...xrefs.filter(xref => xref.databaseType === 'PubMed'));
      }
      return acc;
    }, []);
    return (
      <ExpandableList>
        {ids.map(xref => ({
          id: xref.id,
          content: <Link to={`citations/${xref.id}`}>{xref.id}</Link>,
        }))}
      </ExpandableList>
    );
  },
});
ColumnConfiguration.set(Column.mappedPmId, {
  label: 'Mapped PubMed ID',
  render: () => {
    // TODO This is currently not implemented in the backend see TRM-23257
    // depending on the format, this could use the same processing as PubMed ID
    return '';
  },
});
ColumnConfiguration.set(Column.dateCreate, {
  label: 'Date Created',
  render: data => {
    const { entryAudit } = data[EntrySection.Sequence];
    return entryAudit && entryAudit.firstPublicDate;
  },
});
ColumnConfiguration.set(Column.dateMod, {
  label: 'Date Modified',
  render: data => {
    const { entryAudit } = data[EntrySection.Sequence];
    return entryAudit && entryAudit.lastAnnotationUpdateDate;
  },
});
ColumnConfiguration.set(Column.dateSeqMod, {
  label: 'Date Sequence Modified',
  render: data => {
    const { entryAudit } = data[EntrySection.Sequence];
    return entryAudit && entryAudit.lastSequenceUpdateDate;
  },
});
ColumnConfiguration.set(Column.version, {
  label: 'Version',
  render: data => {
    const { entryAudit } = data[EntrySection.Sequence];
    return entryAudit && <span>{entryAudit.entryVersion}</span>;
  },
});
ColumnConfiguration.set(Column.ftCoiled, getFeatureColumn(FeatureType.COILED));
ColumnConfiguration.set(
  Column.ftCompbias,
  getFeatureColumn(FeatureType.COMPBIAS)
);
// cc:domain ,
ColumnConfiguration.set(Column.ftDomain, getFeatureColumn(FeatureType.DOMAIN));
ColumnConfiguration.set(Column.ftMotif, getFeatureColumn(FeatureType.MOTIF));
ColumnConfiguration.set(Column.proteinFamilies, {
  label: 'Protein Families',
  render: data => {
    // TODO this actually seems to be a subset of this with a query on link?
    // Could maybe be removed
    const familiesData = data[EntrySection.FamilyAndDomains].commentsData.get(
      CommentType.SIMILARITY
    ) as FreeText[];
    return familiesData && <FreeTextView comments={familiesData} />;
  },
});
ColumnConfiguration.set(Column.ftRegion, getFeatureColumn(FeatureType.REGION));
ColumnConfiguration.set(Column.ftRepeat, getFeatureColumn(FeatureType.REPEAT));
ColumnConfiguration.set(Column.ccSimilarity, {
  label: 'Sequence Similarities',
  render: data => {
    const familiesData = data[EntrySection.FamilyAndDomains].commentsData.get(
      CommentType.SIMILARITY
    ) as FreeText[];
    return familiesData && <FreeTextView comments={familiesData} />;
  },
});
ColumnConfiguration.set(Column.ftZnFing, getFeatureColumn(FeatureType.ZN_FING));
// lineage
// tax_id ,

const getXrefColumn = (databaseName: string) => ({
  label: `${databaseName} cross-reference`,
  render: (data: UniProtkbUIModel) => {
    // Get the entry section for the database name
    const entrySection = getDatabaseNameToEntrySection(databaseName);
    if (!entrySection) {
      return undefined;
    }
    const { xrefData } = data[entrySection];
    // Get the category for the database name in the section
    const category = xrefData.find(
      xrefCategory =>
        xrefCategory.category === databaseNameToCategory.get(databaseName)
    );
    if (!category) {
      return undefined;
    }
    // Get the database based on the name
    const database = category.databases.find(
      databaseGroup => databaseGroup.database === databaseName
    );
    return (
      database && (
        <XrefCategoryContent
          database={database}
          primaryAccession={data.primaryAccession}
        />
      )
    );
  },
});

// Add all database cross-reference columns
Object.values(Column)
  .filter(col => col.startsWith('dr_'))
  .forEach(colName => {
    const databaseInfo = getDatabaseInfoByName(colName.substring(3));
    if (!databaseInfo || !databaseInfo.name) {
      /* eslint-disable no-console */
      console.error(`No database found for ${colName}`);
      return;
    }
    ColumnConfiguration.set(colName, getXrefColumn(databaseInfo.name));
  });

export default ColumnConfiguration;
