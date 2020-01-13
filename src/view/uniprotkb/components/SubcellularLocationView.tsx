import React, { FC, Fragment } from 'react';
import { v1 } from 'uuid';
import { SubcellularLocationComment } from '../../../model/types/CommentTypes';
import UniProtEvidenceTag from '../../../components/UniProtEvidenceTag';
import { TextView } from './FreeTextView';

const SubcellularLocationView: FC<{
  comments?: SubcellularLocationComment[];
}> = ({ comments }) => {
  if (!comments || comments.length <= 0) {
    return null;
  }
  return (
    <Fragment>
      {comments.map(
        subcellData =>
          subcellData.subcellularLocations && (
            <section
              className="text-block"
              key={subcellData.molecule ? subcellData.molecule : v1()}
            >
              <h4>{subcellData.molecule}</h4>
              {subcellData.subcellularLocations.map(subcellularLocation => (
                <div
                  key={`${
                    subcellularLocation.location.value
                  }${subcellularLocation.topology &&
                    subcellularLocation.topology.value}`}
                >
                  <strong>{subcellularLocation.location.value}</strong>{' '}
                  {subcellularLocation.location.evidences && (
                    <UniProtEvidenceTag
                      evidences={subcellularLocation.location.evidences}
                    />
                  )}
                  {subcellularLocation.topology && (
                    <Fragment>
                      {`: ${subcellularLocation.topology.value} `}
                      {subcellularLocation.topology.evidences && (
                        <UniProtEvidenceTag
                          evidences={subcellularLocation.topology.evidences}
                        />
                      )}
                    </Fragment>
                  )}
                </div>
              ))}
              {subcellData.note && (
                <TextView comments={subcellData.note.texts} />
              )}
            </section>
          )
      )}
    </Fragment>
  );
};

export default SubcellularLocationView;
