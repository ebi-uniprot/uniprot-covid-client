import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';

const Entry = ({ match }) => <Fragment>{match.params.accession}</Fragment>;

export default withRouter(Entry);
