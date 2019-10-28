/* eslint-disable @typescript-eslint/camelcase */
import React, { Fragment } from 'react';
import SimpleView from '../view/uniprotkb/components/SimpleView';
import ProteinNamesView from '../view/uniprotkb/components/ProteinNamesView';
import OrganismView, {
  OrganismLineage,
  OrganismId,
} from '../view/uniprotkb/components/OrganismView';
import GeneNamesView, {
  GeneAlternativeNamesView,
} from '../view/uniprotkb/components/GeneNamesView';
import { UniProtkbUIModel } from './uniprotkb/UniProtkbConverter';
import NumberView, { Unit } from '../view/uniprotkb/components/NumberView';
import ProteomesView from '../view/uniprotkb/components/ProteomesView';
import FeaturesView from '../view/uniprotkb/components/FeaturesView';
import EntrySection from './types/EntrySection';
import { SequenceCautionView } from '../view/uniprotkb/components/SequenceView';

const ColumnConfiguration: {
  [index: string]: {
    label: string;
    render: (data: UniProtkbUIModel) => JSX.Element | undefined;
  };
} = {
  accession: {
    label: 'Entry',
    render: (data: { primaryAccession: string; entryType: string }) => (
      <SimpleView
        termValue={`${data.primaryAccession} (${data.entryType})`}
        linkTo={`/uniprotkb/${data.primaryAccession}`}
      />
    ),
  },
  id: {
    label: 'Entry Name',
    render: (data: { uniProtId: string }) => (
      <SimpleView termValue={data.uniProtId} />
    ),
  },
  gene_names: {
    label: 'Gene Names',
    render: data => {
      const { geneNamesData } = data[EntrySection.NamesAndTaxonomy];
      return (
        geneNamesData && (
          <GeneNamesView geneNamesData={geneNamesData} isCompact />
        )
      );
    },
  },
  length: {
    label: 'Length',
    render: data => {
      const { sequence } = data[EntrySection.Sequence];
      return sequence && <NumberView value={sequence.length} unit={Unit.DA} />;
    },
  },
  gene_primary: {
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
  },
  gene_oln: {
    label: 'Gene names (Ordered locus)',
    render: data => {
      const { geneNamesData } = data[EntrySection.NamesAndTaxonomy];
      return (
        <Fragment>
          {geneNamesData &&
            geneNamesData.map(
              geneData =>
                geneData.orderedLocusNames && (
                  <GeneAlternativeNamesView
                    alternativeNames={geneData.orderedLocusNames}
                    firstComma={false}
                    key={geneData.orderedLocusNames.join('')}
                  />
                )
            )}
        </Fragment>
      );
    },
  },
  gene_orf: {
    label: 'Gene names (ORF)',
    render: data => {
      const { geneNamesData } = data[EntrySection.NamesAndTaxonomy];
      return (
        <Fragment>
          {geneNamesData &&
            geneNamesData.map(
              geneData =>
                geneData.orfNames && (
                  <GeneAlternativeNamesView
                    alternativeNames={geneData.orfNames}
                    firstComma={false}
                    key={geneData.orfNames.join('')}
                  />
                )
            )}
        </Fragment>
      );
    },
  },
  gene_synonym: {
    label: 'Gene names (Synonyms)',
    render: data => {
      const { geneNamesData } = data[EntrySection.NamesAndTaxonomy];
      return (
        <Fragment>
          {geneNamesData &&
            geneNamesData.map(
              geneData =>
                geneData.synonyms && (
                  <GeneAlternativeNamesView
                    alternativeNames={geneData.synonyms}
                    firstComma={false}
                    key={geneData.synonyms.join('')}
                  />
                )
            )}
        </Fragment>
      );
    },
  },
  organism: {
    label: 'Organism',
    render: data => {
      const { organismData } = data[EntrySection.NamesAndTaxonomy];
      return organismData && <OrganismView data={organismData} />;
    },
  },
  organism_id: {
    label: 'Organism',
    render: data => {
      const { organismData } = data[EntrySection.NamesAndTaxonomy];
      return organismData && <OrganismId taxonId={organismData.taxonId} />;
    },
  },
  protein_name: {
    label: 'Protein names',
    render: data => {
      const { proteinNamesData } = data[EntrySection.NamesAndTaxonomy];
      return (
        proteinNamesData && (
          <ProteinNamesView proteinNames={proteinNamesData} isCompact />
        )
      );
    },
  },
  'dr:proteomes': {
    label: 'Proteomes',
    render: data => {
      const { proteomesData } = data[EntrySection.NamesAndTaxonomy];
      return proteomesData && <ProteomesView data={proteomesData} isCompact />;
    },
  },
  lineage: {
    label: 'Lineage',
    render: data => {
      const { organismData } = data[EntrySection.NamesAndTaxonomy];
      return (
        organismData &&
        organismData.lineage && (
          <OrganismLineage lineage={organismData.lineage} />
        )
      );
    },
  },
  organism_host: {
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
  },

  // TODO split isoforms from main sequence view
  // cc:alternative_products ,

  'ft:var_seq': {
    label: 'Alternative sequence',
    render: data => {
      const { featuresData } = data[EntrySection.Sequence];
      return (
        <Fragment>
          {featuresData && <FeaturesView features={featuresData} />}
        </Fragment>
      );
    },
  },
  error_gmodel_pred: {
    label: 'Erroneous gene model prediction',
    render: data => {
      const { sequenceCaution } = data[EntrySection.Sequence];
      return sequenceCaution && <SequenceCautionView data={sequenceCaution} />;
    },
  },
  // fragment ,
  // gene_location ,
  // length ,
  // mass ,
  // cc:mass_spectrometry ,
  // ft:variant ,
  // ft:non_con ,
  // ft:non_std ,
  // ft:non_ter ,
  // cc:polymorphism ,
  // cc:rna_editing ,
  // sequence ,
  // cc:sequence_caution ,
  // ft:conflict ,
  // ft:unsure ,
  // sequence_version ,
  // absorption ,
  // ft:act_site ,
  // ft:binding ,
  // ft:ca_bind ,
  // cc:catalytic_activity ,
  // cc:cofactor ,
  // ft:dna_bind ,
  // ec ,
  // cc:enzyme_regulation ,
  // cc:function ,
  // kinetics ,
  // ft:metal ,
  // ft:np_bind ,
  // cc:pathway ,
  // ph_dependence ,
  // redox_potential ,
  // ft:site ,
  // temp_dependence ,
  // score ,
  // cc:caution ,
  // feature ,
  // keyword ,
  // keywordid ,
  // matched_text ,
  // cc:miscellaneous ,
  // protein_existence ,
  // reviewed ,
  // tools ,
  // uniparc_id ,
  // cc:interaction ,
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
  // ft:mutagen ,
  // cc:pharmaceutical ,
  // cc:toxic_dose ,
  // ft:intramem ,
  // cc:subcellular_location ,
  // ft:top_dom ,
  // ft:transmem ,
  // ft:chain ,
  // ft:crosslnk ,
  // ft:disulfide ,
  // ft:carbohyd ,
  // ft:init_met ,
  // ft:lipid ,
  // ft:mod_res ,
  // ft:peptide ,
  // cc:ptm ,
  // ft:propep ,
  // ft:signal ,
  // ft:transit ,
  // 3d ,
  // ft:strand ,
  // ft:helix ,
  // ft:turn ,
  // mapped_pm_id ,
  // pm_id ,
  // date_create ,
  // date_mod ,
  // date_seq_mod ,
  // version ,
  // ft:coiled ,
  // ft:compbias ,
  // cc:domain ,
  // ft:domain ,
  // ft:motif ,
  // protein_families ,
  // ft:region ,
  // ft:repeat ,
  // cc:similarity ,
  // ft:zn_fing ,
  // tl:all ,
  // tl:class ,
  // tl:cohort ,
  // tl:family ,
  // tl:forma ,
  // tl:genus ,
  // tl:infraclass ,
  // tl:infraorder ,
  // tl:kingdom ,
  // tl:order ,
  // tl:parvorder ,
  // tl:phylum ,
  // tl:species ,
  // tl:species_group ,
  // tl:species_subgroup ,
  // tl:subclass ,
  // tl:subcohort ,
  // tl:subfamily ,
  // tl:subgenus ,
  // tl:subkingdom ,
  // tl:suborder ,
  // tl:subphylum ,
  // tl:subspecies ,
  // tl:subtribe ,
  // tl:superclass ,
  // tl:superfamily ,
  // tl:superkingdom ,
  // tl:superorder ,
  // tl:superphylum ,
  // tl:tribe ,
  // tl:varietas ,
  // tax_id ,

  // dr:embl ,
  // dr:ccds ,
  // dr:pir ,
  // dr:refseq ,
  // dr:pdb ,
  // dr:pdbsum ,
  // dr:smr ,
  // dr:biogrid ,
  // dr:complexportal ,
  // dr:corum ,
  // dr:dip ,
  // dr:elm ,
  // dr:intact ,
  // dr:mint ,
  // dr:string ,
  // dr:bindingdb ,
  // dr:chembl ,
  // dr:drugbank ,
  // dr:guidetopharmacology ,
  // dr:swisslipids ,
  // dr:drugcentral ,
  // dr:allergome ,
  // dr:cazy ,
  // dr:esther ,
  // dr:imgt_gene-db ,
  // dr:merops ,
  // dr:moondb ,
  // dr:moonprot ,
  // dr:mycoclap ,
  // dr:peroxibase ,
  // dr:rebase ,
  // dr:tcdb ,
  // dr:unilectin ,
  // dr:carbonyldb ,
  // dr:depod ,
  // dr:glyconnect ,
  // dr:iptmnet ,
  // dr:phosphositeplus ,
  // dr:swisspalm ,
  // dr:unicarbkb ,
  // dr:biomuta ,
  // dr:dmdm ,
  // dr:dbsnp ,
  // dr:compluyeast-2dpage ,
  // dr:dosac-cobs-2dpage ,
  // dr:ogp ,
  // dr:reproduction-2dpage ,
  // dr:swiss-2dpage ,
  // dr:ucd-2dpage ,
  // dr:world-2dpage ,
  // dr:cptac ,
  // dr:epd ,
  // dr:maxqb ,
  // dr:paxdb ,
  // dr:peptideatlas ,
  // dr:pride ,
  // dr:promex ,
  // dr:proteomicsdb ,
  // dr:topdownproteomics ,
  // dr:jpost ,
  // dr:massive ,
  // dr:dnasu ,
  // dr:abcd ,
  // dr:ensembl ,
  // dr:ensemblbacteria ,
  // dr:ensemblfungi ,
  // dr:ensemblmetazoa ,
  // dr:ensemblplants ,
  // dr:ensemblprotists ,
  // dr:genedb ,
  // dr:geneid ,
  // dr:gramene ,
  // dr:kegg ,
  // dr:patric ,
  // dr:ucsc ,
  // dr:vectorbase ,
  // dr:wbparasite ,
  // dr:arachnoserver ,
  // dr:araport ,
  // dr:cgd ,
  // dr:conoserver ,
  // dr:ctd ,
  // dr:dictybase ,
  // dr:disgenet ,
  // dr:echobase ,
  // dr:ecogene ,
  // dr:euhcvdb ,
  // dr:eupathdb ,
  // dr:flybase ,
  // dr:genecards ,
  // dr:genereviews ,
  // dr:hgnc ,
  // dr:hpa ,
  // dr:legiolist ,
  // dr:leproma ,
  // dr:maizegdb ,
  // dr:malacards ,
  // dr:mgi ,
  // dr:mim ,
  // dr:niagads ,
  // dr:nextprot ,
  // dr:opentargets ,
  // dr:orphanet ,
  // dr:pharmgkb ,
  // dr:pombase ,
  // dr:pseudocap ,
  // dr:rgd ,
  // dr:sgd ,
  // dr:tair ,
  // dr:tuberculist ,
  // dr:vgnc ,
  // dr:wormbase ,
  // dr:xenbase ,
  // dr:zfin ,
  // dr:eggnog ,
  // dr:genetree ,
  // dr:hogenom ,
  // dr:inparanoid ,
  // dr:ko ,
  // dr:oma ,
  // dr:orthodb ,
  // dr:phylomedb ,
  // dr:treefam ,
  // dr:biocyc ,
  // dr:brenda ,
  // dr:reactome ,
  // dr:sabio-rk ,
  // dr:signalink ,
  // dr:signor ,
  // dr:unipathway ,
  // dr:plantreactome ,
  // dr:chitars ,
  // dr:evolutionarytrace ,
  // dr:genewiki ,
  // dr:genomernai ,
  // dr:pmap-cutdb ,
  // dr:pro ,
  // dr:pharos ,
  // dr:bgee ,
  // dr:cleanex ,
  // dr:collectf ,
  // dr:expressionatlas ,
  // dr:genevisible ,
  // dr:disprot ,
  // dr:cdd ,
  // dr:gene3d ,
  // dr:hamap ,
  // dr:interpro ,
  // dr:panther ,
  // dr:pfam ,
  // dr:pirsf ,
  // dr:prints ,
  // dr:prodom ,
  // dr:sfld ,
  // dr:smart ,
  // dr:supfam ,
  // dr:tigrfams ,
  // dr:prosite ,
  // dr:embl ,
  // dr:ccds ,
  // dr:pir ,
  // dr:refseq ,
  // dr:pdb ,
  // dr:pdbsum ,
  // dr:smr ,
  // dr:biogrid ,
  // dr:complexportal ,
  // dr:corum ,
  // dr:dip ,
  // dr:elm ,
  // dr:intact ,
  // dr:mint ,
  // dr:string ,
  // dr:bindingdb ,
  // dr:chembl ,
  // dr:drugbank ,
  // dr:guidetopharmacology ,
  // dr:swisslipids ,
  // dr:drugcentral ,
  // dr:allergome ,
  // dr:cazy ,
  // dr:esther ,
  // dr:imgt_gene-db ,
  // dr:merops ,
  // dr:moondb ,
  // dr:moonprot ,
  // dr:mycoclap ,
  // dr:peroxibase ,
  // dr:rebase ,
  // dr:tcdb ,
  // dr:unilectin ,
  // dr:carbonyldb ,
  // dr:depod ,
  // dr:glyconnect ,
  // dr:iptmnet ,
  // dr:phosphositeplus ,
  // dr:swisspalm ,
  // dr:unicarbkb ,
  // dr:biomuta ,
  // dr:dmdm ,
  // dr:dbsnp ,
  // dr:compluyeast-2dpage ,
  // dr:dosac-cobs-2dpage ,
  // dr:ogp ,
  // dr:reproduction-2dpage ,
  // dr:swiss-2dpage ,
  // dr:ucd-2dpage ,
  // dr:world-2dpage ,
  // dr:cptac ,
  // dr:epd ,
  // dr:maxqb ,
  // dr:paxdb ,
  // dr:peptideatlas ,
  // dr:pride ,
  // dr:promex ,
  // dr:proteomicsdb ,
  // dr:topdownproteomics ,
  // dr:jpost ,
  // dr:massive ,
  // dr:dnasu ,
  // dr:abcd ,
  // dr:ensembl ,
  // dr:ensemblbacteria ,
  // dr:ensemblfungi ,
  // dr:ensemblmetazoa ,
  // dr:ensemblplants ,
  // dr:ensemblprotists ,
  // dr:genedb ,
  // dr:geneid ,
  // dr:gramene ,
  // dr:kegg ,
  // dr:patric ,
  // dr:ucsc ,
  // dr:vectorbase ,
  // dr:wbparasite ,
  // dr:arachnoserver ,
  // dr:araport ,
  // dr:cgd ,
  // dr:conoserver ,
  // dr:ctd ,
  // dr:dictybase ,
  // dr:disgenet ,
  // dr:echobase ,
  // dr:ecogene ,
  // dr:euhcvdb ,
  // dr:eupathdb ,
  // dr:flybase ,
  // dr:genecards ,
  // dr:genereviews ,
  // dr:hgnc ,
  // dr:hpa ,
  // dr:legiolist ,
  // dr:leproma ,
  // dr:maizegdb ,
  // dr:malacards ,
  // dr:mgi ,
  // dr:mim ,
  // dr:niagads ,
  // dr:nextprot ,
  // dr:opentargets ,
  // dr:orphanet ,
  // dr:pharmgkb ,
  // dr:pombase ,
  // dr:pseudocap ,
  // dr:rgd ,
  // dr:sgd ,
  // dr:tair ,
  // dr:tuberculist ,
  // dr:vgnc ,
  // dr:wormbase ,
  // dr:xenbase ,
  // dr:zfin ,
  // dr:eggnog ,
  // dr:genetree ,
  // dr:hogenom ,
  // dr:inparanoid ,
  // dr:ko ,
  // dr:oma ,
  // dr:orthodb ,
  // dr:phylomedb ,
  // dr:treefam ,
  // dr:biocyc ,
  // dr:brenda ,
  // dr:reactome ,
  // dr:sabio-rk ,
  // dr:signalink ,
  // dr:signor ,
  // dr:unipathway ,
  // dr:plantreactome ,
  // dr:chitars ,
  // dr:evolutionarytrace ,
  // dr:genewiki ,
  // dr:genomernai ,
  // dr:pmap-cutdb ,
  // dr:pro ,
  // dr:pharos ,
  // dr:bgee ,
  // dr:cleanex ,
  // dr:collectf ,
  // dr:expressionatlas ,
  // dr:genevisible ,
  // dr:disprot ,
  // dr:cdd ,
  // dr:gene3d ,
  // dr:hamap ,
  // dr:interpro ,
  // dr:panther ,
  // dr:pfam ,
  // dr:pirsf ,
  // dr:prints ,
  // dr:prodom ,
  // dr:sfld ,
  // dr:smart ,
  // dr:supfam ,
  // dr:tigrfams ,
  // dr:prosite
};

export default ColumnConfiguration;
