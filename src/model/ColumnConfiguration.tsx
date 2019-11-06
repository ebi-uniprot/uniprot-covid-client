/* eslint-disable @typescript-eslint/camelcase */
import React, { Fragment } from 'react';
import SimpleView from '../view/uniprotkb/components/SimpleView';
import ProteinNamesView from '../view/uniprotkb/components/ProteinNamesView';
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
} from '../view/uniprotkb/components/SequenceView';
import { Flag } from './uniprotkb/sections/SequenceConverter';
import FeatureType from './types/FeatureType';

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

const ColumnConfiguration: {
  [index: string]: {
    label: string;
    render: (data: UniProtkbUIModel) => JSX.Element | string | undefined;
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
      return sequence && numberView({ value: sequence.length, unit: Unit.AA });
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
                  <Fragment key={geneData.orderedLocusNames.join('')}>
                    {geneAlternativeNamesView(
                      geneData.orderedLocusNames,
                      false
                    )}
                  </Fragment>
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
                  <Fragment key={geneData.orfNames.join('')}>
                    {geneAlternativeNamesView(geneData.orfNames, false)}
                  </Fragment>
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
                  <Fragment key={geneData.synonyms.join('')}>
                    {geneAlternativeNamesView(geneData.synonyms, false)}
                  </Fragment>
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
  dr_proteomes: {
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

  ft_var_seq: {
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
  fragment: {
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
  },
  // gene_location ,  "Invalid fields parameter value 'gene_location'"
  mass: {
    label: 'Mass',
    render: data => {
      const { molWeight } = data[EntrySection.Sequence];
      return numberView({ value: molWeight, unit: Unit.DA });
    },
  },
  cc_mass_spectrometry: {
    label: 'Mass Spectrometry',
    render: data => {
      const { massSpectrometry } = data[EntrySection.Sequence];
      return (
        massSpectrometry && <MassSpectrometryView data={massSpectrometry} />
      );
    },
  },
  // ft:variant ,
  ft_non_con: getFeatureColumn(FeatureType.NON_CONS),
  ft_non_std: getFeatureColumn(FeatureType.NON_STD),
  ft_non_ter: getFeatureColumn(FeatureType.NON_TER),
  // cc:polymorphism ,
  // cc:rna_editing ,
  // sequence ,
  // cc:sequence_caution ,
  ft_conflict: getFeatureColumn(FeatureType.CONFLICT),
  ft_unsure: getFeatureColumn(FeatureType.UNSURE),
  // sequence_version ,
  // absorption ,
  ft_act_site: getFeatureColumn(FeatureType.ACT_SITE),
  ft_binding: getFeatureColumn(FeatureType.BINDING),
  ft_ca_bind: getFeatureColumn(FeatureType.CA_BIND),
  // cc:catalytic_activity ,
  // cc:cofactor ,
  ft_dna_bind: getFeatureColumn(FeatureType.DNA_BIND),
  // ec ,
  // cc:enzyme_regulation ,
  // cc:function ,
  // kinetics ,
  ft_metal: getFeatureColumn(FeatureType.METAL),
  ft_np_bind: getFeatureColumn(FeatureType.NP_BINDL),
  // cc:pathway ,
  // ph_dependence ,
  // redox_potential ,
  ft_site: getFeatureColumn(FeatureType.SITE),
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
  ft_mutagen: getFeatureColumn(FeatureType.MUTAGEN),
  // cc:pharmaceutical ,
  // cc:toxic_dose ,
  ft_intramem: getFeatureColumn(FeatureType.INTRAMEM),
  // cc:subcellular_location ,
  ft_top_dom: getFeatureColumn(FeatureType.TOPO_DOM),
  ft_transmem: getFeatureColumn(FeatureType.TRANSMEM),
  ft_chain: getFeatureColumn(FeatureType.CHAIN),
  ft_crosslnk: getFeatureColumn(FeatureType.CROSSLNK),
  ft_disulfide: getFeatureColumn(FeatureType.DISULFID),
  ft_carbohyd: getFeatureColumn(FeatureType.CARBOHYD),
  ft_init_met: getFeatureColumn(FeatureType.INIT_MET),
  ft_lipid: getFeatureColumn(FeatureType.LIPID),
  ft_mod_res: getFeatureColumn(FeatureType.MOD_RES),
  ft_peptide: getFeatureColumn(FeatureType.PEPTIDE),
  // cc:ptm ,
  ft_propep: getFeatureColumn(FeatureType.PROPEP),
  ft_signal: getFeatureColumn(FeatureType.SIGNAL),
  ft_transit: getFeatureColumn(FeatureType.TRANSIT),
  // 3d ,
  ft_strand: getFeatureColumn(FeatureType.STRAND),
  ft_helix: getFeatureColumn(FeatureType.HELIX),
  ft_turn: getFeatureColumn(FeatureType.TURN),
  // mapped_pm_id ,
  // pm_id ,
  // date_create ,
  // date_mod ,
  // date_seq_mod ,
  // version ,
  ft_coiled: getFeatureColumn(FeatureType.COILED),
  ft_compbias: getFeatureColumn(FeatureType.COMPBIAS),
  // cc:domain ,
  ft_domain: getFeatureColumn(FeatureType.DOMAIN),
  ft_motif: getFeatureColumn(FeatureType.MOTIF),
  // protein_families ,
  ft_region: getFeatureColumn(FeatureType.REGION),
  ft_repeat: getFeatureColumn(FeatureType.REPEAT),
  // cc:similarity ,
  ft_zn_fing: getFeatureColumn(FeatureType.ZN_FING),
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
