import React, { FC } from 'react';
import PlaceHolderSVG from './svgs/place-holder.svg';
import './styles/PlaceHolder.scss';

const PlaceHolder: FC<{}> = () => (
  <div className="placeholder">
    <PlaceHolderSVG />
  </div>
);

export default PlaceHolder;
