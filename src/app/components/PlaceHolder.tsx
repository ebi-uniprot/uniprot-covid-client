import React, { FC } from 'react';
import PlaceHolderSVG from './svgs/PlaceHolder.svg';
import './styles/PlaceHolder.scss';

const PlaceHolder: FC<{}> = () => (
  <div className="placeholder">
    <PlaceHolderSVG />
  </div>
);

export default PlaceHolder;
