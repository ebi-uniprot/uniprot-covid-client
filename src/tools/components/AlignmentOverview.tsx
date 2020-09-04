import React, {
  FC,
  useCallback,
  Children,
  cloneElement,
  isValidElement,
} from 'react';

const AlignmentOverview = ({ height, children }) => {
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
        } else {
          return child;
        }
      })}
    </div>
  );
};

export default AlignmentOverview;
