import React, { FC, Fragment } from 'react';
import { Card } from 'franklin-sites';
import hasContent from '../../model/utils/utils';
import FreeTextView, { TextView } from './components/FreeTextView';
import CatalyticActivityView from './components/CatalyticActivityView';
import KeywordView from './components/KeywordView';
import XRefView from './components/XRefView';
import FeaturesView from './components/FeaturesView';
import EntrySection from '../../model/types/EntrySection';
import Comment, {
  Absorption,
  Kinetics,
  pHDependence,
  RedoxPotential,
  TemperatureDependence,
  CommentType,
  CatalyticActivity,
  FreeText,
} from '../../model/types/CommentTypes';
import { UIModel } from '../../model/uniprotkb/SectionConverter';
import GoRibbon from './components/GoRibbon';
import UniProtEvidenceTag from '../../components/UniProtEvidenceTag';

const AbsorptionView: FC<{ data: Absorption }> = ({ data }) => {
  if (!data.absorption) {
    return null;
  }
  return (
    <Fragment>
      <h4>Absorption</h4>
      <section className="text-block">
        Abs(max) = {data.absorption.approximate && '~'}
        {data.absorption.max}nm
      </section>
      <section className="text-block">
        {data.absorption.note && (
          <TextView comments={data.absorption.note.texts} />
        )}
        {data.absorption.evidences && (
          <UniProtEvidenceTag evidences={data.absorption.evidences} />
        )}
      </section>
    </Fragment>
  );
};

const KineticsView: FC<{ data: Kinetics }> = ({ data }) => {
  if (!data.kineticParameters) {
    return null;
  }
  return (
    <Fragment>
      <h4>Kinetics</h4>
      <section className="text-block">
        {data.kineticParameters.michaelisConstants && (
          <ul className="no-bullet">
            {data.kineticParameters.michaelisConstants.map(km => (
              <li key={km.constant}>
                K<sub>M</sub>={km.constant}
                {km.unit} for {km.substrate}{' '}
                <UniProtEvidenceTag evidences={km.evidences} />
              </li>
            ))}
          </ul>
        )}
      </section>
      <section className="text-block">
        {data.kineticParameters.note && (
          <TextView comments={data.kineticParameters.note.texts} />
        )}
      </section>
    </Fragment>
  );
};

const BioPhysicoChemicalPropertiesView: FC<{ data: Comment[] | undefined }> = ({
  data,
}) => {
  if (!data) {
    return null;
  }
  return (
    <Fragment>
      {data.map(comment => (
        <Fragment>
          {(comment as Absorption).absorption && (
            <AbsorptionView data={comment as Absorption} />
          )}
          {(comment as Kinetics).kineticParameters && (
            <KineticsView data={comment as Kinetics} />
          )}
          {(comment as pHDependence).phDependence && (
            <TextView comments={(comment as pHDependence).phDependence.texts} />
          )}
          {(comment as RedoxPotential).redoxPotential && (
            <TextView
              comments={(comment as RedoxPotential).redoxPotential.texts}
            />
          )}
          {(comment as TemperatureDependence).temperatureDependence && (
            <TextView
              comments={
                (comment as TemperatureDependence).temperatureDependence.texts
              }
            />
          )}
        </Fragment>
      ))}
    </Fragment>
  );
};

const FunctionSection: FC<{
  data: UIModel;
  sequence: string;
  primaryAccession: string;
}> = ({ data, sequence, primaryAccession }): JSX.Element | null => {
  if (!hasContent(data)) {
    return null;
  }
  return (
    <div id={EntrySection.Function}>
      <Card title={EntrySection.Function}>
        <FreeTextView
          comments={data.commentsData.get(CommentType.FUNCTION) as FreeText[]}
        />
        <CatalyticActivityView
          comments={
            data.commentsData.get(
              CommentType.CATALYTIC_ACTIVITY
            ) as CatalyticActivity[]
          }
        />
        <FreeTextView
          comments={data.commentsData.get(CommentType.PATHWAY) as FreeText[]}
          title={CommentType.PATHWAY.toLowerCase()}
        />
        <FreeTextView
          comments={
            data.commentsData.get(CommentType.MISCELLANEOUS) as FreeText[]
          }
          title={CommentType.MISCELLANEOUS.toLowerCase()}
        />
        {data.commentsData.get(CommentType.BIOPHYSICOCHEMICAL_PROPERTIES) && (
          <BioPhysicoChemicalPropertiesView
            data={data.commentsData.get(
              CommentType.BIOPHYSICOCHEMICAL_PROPERTIES
            )}
          />
        )}
        <FeaturesView features={data.featuresData} sequence={sequence} />
        <GoRibbon primaryAccession={primaryAccession} />
        <KeywordView keywords={data.keywordData} />
        <XRefView xrefs={data.xrefData} primaryAccession={primaryAccession} />
      </Card>
    </div>
  );
};

export default FunctionSection;
