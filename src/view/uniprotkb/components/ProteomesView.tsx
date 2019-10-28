import React, { Fragment } from 'react';
import { InfoList } from 'franklin-sites';
import { Link } from 'react-router-dom';
import { Xref } from '../../../model/utils/XrefUtils';
import { Property } from '../../../model/types/modelTypes';

const ProteomesId: React.FC<{ id?: string }> = ({ id }) => (
  <Link to={`/proteomes/${id}`}>{id}</Link>
);

const ProteomesComponents: React.FC<{ components?: Property[] }> = ({
  components,
}) => (
  <Fragment>
    {components &&
      components.reduce(
        (accumulator, component) =>
          !accumulator && component.value
            ? component.value
            : `$
          {accumulator}, ${component.value}`,
        ''
      )}
  </Fragment>
);

const ProteomesView: React.FC<{ data?: Xref[]; isCompact?: boolean }> = ({
  data,
  isCompact = false,
}) => {
  if (!data) {
    return null;
  }
  return (
    <Fragment>
      {data.map(proteome => (
        <InfoList
          key={proteome.id}
          isCompact={isCompact}
          infoData={[
            {
              title: 'Identifier',
              content: <ProteomesId id={proteome.id} />,
            },
            {
              title: 'Component',
              content: <ProteomesComponents components={proteome.properties} />,
            },
          ]}
        />
      ))}
    </Fragment>
  );
};

export default ProteomesView;
