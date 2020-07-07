import React, { FC } from 'react';
import { useSpring, animated } from 'react-spring';
import './styles/sliding-panel.scss';

type Position = 'top' | 'bottom' | 'left' | 'right';

const SlidingPanel: FC<{ children: JSX.Element; position: Position }> = ({
  children,
  position,
}) => {
  const [props] = useSpring(() => ({
    opacity: 1,
    marginRight: 0,
    from: { opacity: 0, marginRight: -1000 },
  }));

  return (
    <animated.div
      className={`sliding-panel sliding-panel--${position}`}
      style={props}
    >
      <div>{children}</div>
    </animated.div>
  );
};

export default SlidingPanel;
