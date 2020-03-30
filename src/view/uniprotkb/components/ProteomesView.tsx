import React, { Fragment } from 'react';
import { InfoList } from 'franklin-sites';
import { Xref } from '../../../model/types/CommentTypes';

const ProteomesId: React.FC<{ id?: string }> = ({ id }) => (
  <Fragment>
    {id}
    {/* <a href={`//www.uniprot.org/proteomes/${id}`}>
    {id}
  </a> */}
  </Fragment>
);

const ProteomesComponents: React.FC<{
  components?: { [key: string]: string };
}> = ({ components }) => (
  <Fragment>{components && Object.values(components).join(', ')}</Fragment>
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
