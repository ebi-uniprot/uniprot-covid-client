import React, { FC, Fragment } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import BlastForm from './BlastForm';
import SideBarLayout from '../layout/SideBarLayout';
import { RootState, RootAction } from '../state/state-types';
import * as blastActions from './state/blastActions';
import { BlastFormValues } from './data/BlastFormData';

const BlastPage: FC<{
  dispatchRunBlastJob: (formValues: BlastFormValues) => void;
}> = ({ dispatchRunBlastJob }) => {
  return (
    <Fragment>
      <SideBarLayout title={<h2>BLAST</h2>} sidebar={<h3>Recent jobs</h3>}>
        <BlastForm runBlastJob={dispatchRunBlastJob} />
      </SideBarLayout>
    </Fragment>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    jobs: state.blast.jobs,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) =>
  bindActionCreators(
    {
      dispatchRunBlastJob: (formValues: BlastFormValues) =>
        blastActions.runBlastJob(formValues),
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(BlastPage);
