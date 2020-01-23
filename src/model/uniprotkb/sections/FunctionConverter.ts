import {
  CommentType,
  AbsorptionComment,
  KineticsComment,
  pHDependenceComment,
  RedoxPotentialComment,
  TemperatureDependenceComment,
  TextWithEvidence,
  Xref,
} from '../../types/CommentTypes';
import KeywordCategory from '../../types/KeywordCategory';
import FeatureType from '../../types/FeatureType';
import EntrySection from '../../types/EntrySection';
import { convertSection, UIModel } from '../SectionConverter';
import { UniProtkbAPIModel } from '../UniProtkbConverter';
import { Evidence } from '../../types/modelTypes';
import { groupBy } from '../../../utils/utils';

export type Absorption = {
  max: number;
  approximate: boolean;
  note?: {
    texts: TextWithEvidence[];
  };
  evidences?: Evidence[];
};

export type KineticParameters = {
  michaelisConstants?: {
    constant: number;
    unit: string;
    substrate: string;
    evidences: Evidence[];
  }[];
  note: {
    texts: TextWithEvidence[];
  };
};

export type CofactorComment = {
  commentType: CommentType.COFACTOR;
  cofactors?: {
    name: string;
    evidences?: Evidence[];
    cofactorReference?: Xref;
  }[];
  note: {
    texts: TextWithEvidence[];
  };
};

export type BioPhysicoChemicalProperties = {
  absorption?: Absorption;
  kinetics?: KineticParameters;
  pHDependence?: TextWithEvidence[];
  redoxPotential?: TextWithEvidence[];
  temperatureDependence?: TextWithEvidence[];
};
export type FunctionUIModel = {
  bioPhysicoChemicalProperties: BioPhysicoChemicalProperties;
  goTerms?: Map<GoAspect, GoTerm[]>;
} & UIModel;

export enum GoAspect {
  P = 'Biological Process',
  F = 'Molecular Function',
  C = 'Cellular Component',
}

export type GoTerm = {
  aspect?: GoAspect;
  termDescription?: string;
  evidences?: Evidence[];
} & Xref;

const keywordsCategories = [
  KeywordCategory.MOLECULAR_FUNCTION,
  KeywordCategory.BIOLOGICAL_PROCESS,
  KeywordCategory.LIGAND,
];

const featuresCategories = [
  FeatureType.DOMAIN,
  FeatureType.REPEAT,
  FeatureType.CA_BIND,
  FeatureType.ZN_FING,
  FeatureType.DNA_BIND,
  FeatureType.NP_BINDL,
  FeatureType.REGION,
  FeatureType.COILED,
  FeatureType.MOTIF,
  FeatureType.ACT_SITE,
  FeatureType.METAL,
  FeatureType.BINDING,
  FeatureType.SITE,
];

const commentsCategories = [
  CommentType.FUNCTION,
  CommentType.CATALYTIC_ACTIVITY,
  CommentType.COFACTOR,
  CommentType.ACTIVITY_REGULATION,
  CommentType.BIOPHYSICOCHEMICAL_PROPERTIES,
  CommentType.PATHWAY,
  CommentType.MISCELLANEOUS,
];

const convertFunction = (data: UniProtkbAPIModel) => {
  const convertedSection = convertSection(
    data,
    commentsCategories,
    keywordsCategories,
    featuresCategories,
    EntrySection.Function
  ) as FunctionUIModel;
  const bpcProperties = convertedSection.commentsData.get(
    CommentType.BIOPHYSICOCHEMICAL_PROPERTIES
  );
  convertedSection.bioPhysicoChemicalProperties = {};
  if (bpcProperties) {
    bpcProperties.forEach(bpcProperty => {
      if ((bpcProperty as AbsorptionComment).absorption) {
        convertedSection.bioPhysicoChemicalProperties.absorption = (bpcProperty as AbsorptionComment).absorption;
      }
      if ((bpcProperty as KineticsComment).kineticParameters) {
        convertedSection.bioPhysicoChemicalProperties.kinetics = (bpcProperty as KineticsComment).kineticParameters;
      }
      if ((bpcProperty as pHDependenceComment).phDependence) {
        convertedSection.bioPhysicoChemicalProperties.pHDependence = (bpcProperty as pHDependenceComment).phDependence.texts;
      }
      if ((bpcProperty as RedoxPotentialComment).redoxPotential) {
        convertedSection.bioPhysicoChemicalProperties.redoxPotential = (bpcProperty as RedoxPotentialComment).redoxPotential.texts;
      }
      if ((bpcProperty as TemperatureDependenceComment).temperatureDependence) {
        convertedSection.bioPhysicoChemicalProperties.temperatureDependence = (bpcProperty as TemperatureDependenceComment).temperatureDependence.texts;
      }
    });
  }
  convertedSection.commentsData.delete(
    CommentType.BIOPHYSICOCHEMICAL_PROPERTIES
  );

  if (data.databaseCrossReferences) {
    const goTerms = (data.databaseCrossReferences.filter(
      xref => xref.databaseType === 'GO' && xref.properties
    ) as GoTerm[]).map(term => {
      const goTermProperty =
        term.properties &&
        term.properties.find(property => property.key === 'GoTerm');
      const aspect =
        goTermProperty &&
        goTermProperty.value &&
        goTermProperty.value.substring(0, 1);
      const termDescription =
        goTermProperty &&
        goTermProperty.value &&
        goTermProperty.value.substring(2);
      return {
        ...term,
        aspect: GoAspect[aspect as keyof typeof GoAspect],
        termDescription,
      };
    });
    convertedSection.goTerms = groupBy(goTerms, (term: GoTerm) => term.aspect);
  }
  return convertedSection;
};

export default convertFunction;