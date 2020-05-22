import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { LocationToPath, Location } from '../../../app/config/urls';
import BlastForm from './BlastForm';

const Blast = () => {
  return (
    <div>
      Blast
      <Switch>
        <Route path={LocationToPath[Location.Blast]}>
          <BlastForm />
        </Route>
      </Switch>
    </div>
  );
};

export default Blast;
