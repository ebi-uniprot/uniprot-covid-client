import React, {
  FC,
  Children,
  cloneElement,
  isValidElement,
  ReactNode,
} from 'react';

type AlignmentOverviewProps = {
  height: string;
  children: ReactNode;
};

const AlignmentOverview: FC<AlignmentOverviewProps> = ({
  height,
  children,
}) => {
  const trackHeight = Math.floor(
    parseInt(height, 10) / Children.toArray(children).length
  );
  const marginBottom = Math.floor(trackHeight / 6);

  return (
    <div>
      {Children.map(children, (child) => {
        if (isValidElement(child)) {
          return cloneElement(child, {
            ...child.props,
            height: trackHeight - marginBottom,
          });
        }

        return child;
      })}
    </div>
  );
};

export default AlignmentOverview;
