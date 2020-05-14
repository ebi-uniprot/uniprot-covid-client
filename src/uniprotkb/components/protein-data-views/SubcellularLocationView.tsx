import React, { FC, Fragment } from 'react';
import { v1 } from 'uuid';
import { SubcellularLocationComment } from '../../types/commentTypes';
import UniProtKBEvidenceTag from './UniProtKBEvidenceTag';
import { TextView } from './FreeTextView';

const SubcellularLocationView: FC<{
  comments?: SubcellularLocationComment[];
}> = ({ comments }) => {
  if (!comments || !comments.length) {
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
              <h3>{subcellData.molecule}</h3>
              {subcellData.subcellularLocations.map(subcellularLocation => (
                <div
                  key={`${
                    subcellularLocation.location.value
                  }${subcellularLocation.topology &&
                    subcellularLocation.topology.value}`}
                >
                  <strong>{subcellularLocation.location.value}</strong>{' '}
                  {subcellularLocation.location.evidences && (
                    <UniProtKBEvidenceTag
                      evidences={subcellularLocation.location.evidences}
                    />
                  )}
                  {subcellularLocation.topology && (
                    <Fragment>
                      {`: ${subcellularLocation.topology.value} `}
                      {subcellularLocation.topology.evidences && (
                        <UniProtKBEvidenceTag
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
