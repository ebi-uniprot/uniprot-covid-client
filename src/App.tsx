import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { FranklinSite } from 'franklin-sites';
import { RootState } from './state/state-types';
import HomePage from './pages/HomePage';
import ResultsPage from './pages/ResultsPage';

declare const BASE_URL: string;

type AppProps = {
  store: RootState;
};

const App: React.FC<AppProps> = ({ store }) => (
  <FranklinSite>
    <Provider store={store}>
      <Router basename={BASE_URL}>
        <Switch>
          <Route path="/" exact render={HomePage} />
          <Route path="/uniprotkb" component={ResultsPage} />
        </Switch>
      </Router>
    </Provider>
  </FranklinSite>
);

export default App;
