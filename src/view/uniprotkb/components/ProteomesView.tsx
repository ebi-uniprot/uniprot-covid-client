import React, { Fragment } from 'react';
import { InfoList } from 'franklin-sites';
import { v1 } from 'uuid';
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

export const ProteomesView: React.FC<{ data?: Xref[] }> = ({ data }) => {
  if (!data) {
    return null;
  }
  return (
    <Fragment>
      {data.map(proteome => (
        <div key={v1()}>
          <ProteomesId id={proteome.id} />
          {': '}
          <ProteomesComponents components={proteome.properties} />
        </div>
      ))}
    </Fragment>
  );
};

const ProteomesListView: React.FC<{ data?: Xref[] }> = ({ data }) => {
  if (!data) {
    return null;
  }
  return (
    <Fragment>
      {data.map(proteome => (
        <InfoList
          key={proteome.id}
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

export default ProteomesListView;
