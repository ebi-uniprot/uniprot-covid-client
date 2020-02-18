import React, { FC, Fragment } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { Link, useParams } from 'react-router-dom';
import BlastForm from './BlastForm';
import SideBarLayout from '../layout/SideBarLayout';
import { RootState, RootAction } from '../state/state-types';
import * as blastActions from './state/blastActions';
import { BlastFormValues } from './data/BlastFormData';
import { BlastJob } from './state/blastInitialState';
import { BlastHsp } from './types/blastResults';

const RecentJobs: FC<{ jobs: BlastJob[] }> = ({ jobs }) => (
  <ul className="no-bullet">
    {jobs.map(job => (
      <li key={job.jobId}>
        <Link to={`/blast/${job.jobId}`}>{job.jobId}</Link>
      </li>
    ))}
  </ul>
);

const parseHitDescription = (string: string) => {
  const regex = new RegExp(/(.*)(OS=.*)(OX=.*)(GN=.*)(PE=.*)(SV=.*)/);
  const matches = string.match(regex);
  if (!matches) {
    return {};
  }
  return {
    proteinDescription: matches[1],
    organism: matches[2] && matches[2].substring(3).trim(),
    taxid: matches[3] && matches[3].substring(3).trim(),
    geneName: matches[4] && matches[4].substring(3).trim(),
    proteinExistence: matches[5] && matches[5].substring(3).trim(),
  };
};

const BlastResultsHsp: FC<{ hsp: BlastHsp }> = ({ hsp }) => (
  <section>{`${hsp.hsp_hit_from}-${hsp.hsp_hit_to} bit-score:${hsp.hsp_bit_score}`}</section>
);

const BlastResults: FC<{ job: BlastJob | undefined }> = ({ job }) => {
  if (!job) {
    return null;
  }
  return (
    <Fragment>
      <table className="data-table__table">
        <thead className="data-table__table__header">
          <tr className="data-table__table__header__row">
            <th className="data-table__table__header__row__cell">Entry</th>
            <th className="data-table__table__header__row__cell">
              Protein name
            </th>
            <th className="data-table__table__header__row__cell">Organism</th>
            <th className="data-table__table__header__row__cell">Gene name</th>
            <th className="data-table__table__header__row__cell">Alignment</th>
          </tr>
        </thead>
        <tbody className="data-table__table__body">
          {job.data &&
            job.data.hits &&
            job.data.hits.map(hit => {
              const {
                proteinDescription,
                organism,
                taxid,
                geneName,
              } = parseHitDescription(hit.hit_desc);
              return (
                <tr key={hit.hit_acc}>
                  <td className="data-table__table__body__cell">
                    <Link to={`/uniprotkb/${hit.hit_acc}`}>{hit.hit_acc}</Link>
                  </td>
                  <td className="data-table__table__body__cell">
                    {proteinDescription}
                  </td>
                  <td className="data-table__table__body__cell">
                    <Link to={`/taxonomy/${taxid}`}>{organism}</Link>
                  </td>
                  <td className="data-table__table__body__cell">{geneName}</td>
                  <td className="data-table__table__body__cell">
                    {hit.hit_hsps.map(hsp => (
                      <BlastResultsHsp
                        hsp={hsp}
                        key={`${hsp.hsp_hit_from}-${hsp.hsp_hit_to}`}
                      />
                    ))}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </Fragment>
  );
};

const BlastPage: FC<{
  dispatchRunBlastJob: (formValues: BlastFormValues) => void;
  jobs: BlastJob[];
}> = ({ dispatchRunBlastJob, jobs }) => {
  const { jobId } = useParams();
  return (
    <Fragment>
      <SideBarLayout
        title={<h2>BLAST</h2>}
        sidebar={
          <Fragment>
            <h3>Recent jobs</h3>
            <RecentJobs jobs={jobs} />
          </Fragment>
        }
      >
        <Fragment>
          {!jobId && <BlastForm runBlastJob={dispatchRunBlastJob} />}
          {jobId && (
            <BlastResults job={jobs.find(job => job.jobId === jobId)} />
          )}
        </Fragment>
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
