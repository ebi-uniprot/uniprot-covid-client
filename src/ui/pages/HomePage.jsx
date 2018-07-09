import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import Block from '../layout/Block';
import HomePageLayout from '../layout/HomePageLayout';

const HomePage = () => (
  <HomePageLayout>
    <h3>Welcome!</h3>
    
    <Block columns="1">
      <div>1st col block</div>
    </Block>

    <Block columns="2">
      <div>1st col block</div>
      <div>2nd col block</div>
    </Block>

    <Block columns="3">
      <div>1st col block</div>
      <div>2nd col block</div>
      <div>3rd col block</div>
    </Block>

    <Block columns="4">
      <div>1st col block</div>
      <div>2nd col block</div>
      <div>3rd col block</div>
      <div>4th col block</div>
      <div>5th col block</div>
      <div>6th col block</div>
    </Block>

  </HomePageLayout>
);

export default HomePage;
