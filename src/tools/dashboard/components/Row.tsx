import React, { memo, FocusEvent } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Card } from 'franklin-sites';

import { Job, FinishedJob } from '../../blast/types/blastJob';
import { Status } from '../../blast/types/blastStatuses';

import { updateJobTitle, deleteJob } from '../../state/toolsActions';

import './styles/Dashboard.scss';

interface NameProps {
  id: Job['internalID'];
  children: Job['title'];
}

const Name = ({ children, id }: NameProps) => {
  const dispatch = useDispatch();

  const handleBlur = (event: FocusEvent) => {
    const text = (event.target as HTMLSpanElement).innerText.trim();
    if (text !== children) dispatch(updateJobTitle(id, text));
  };

  return (
    <span contentEditable onBlur={handleBlur}>
      {children}
    </span>
  );
};

interface TimeProps {
  children: number;
}

const Time = ({ children }: TimeProps) => {
  const date = new Date(children);
  const YYYY = date.getFullYear();
  const MM = `${date.getMonth()}`.padStart(2, '0');
  const DD = `${date.getDate()}`.padStart(2, '0');
  const hh = `${date.getHours()}`.padStart(2, '0');
  const mm = `${date.getMinutes()}`.padStart(2, '0');
  return (
    <time dateTime={date.toISOString()}>
      {YYYY}-{MM}-{DD}
      <br />
      <span className="dashboard__body__hours">
        {hh}:{mm}
      </span>
    </time>
  );
};

interface NiceStatusPropsNotFinished {
  children: Exclude<Status, Status.FINISHED>;
  queriedHits: Job['parameters']['hits'];
}
interface NiceStatusPropsFinished {
  children: Status.FINISHED;
  hits: FinishedJob['data']['hits'];
  queriedHits: FinishedJob['parameters']['hits'];
}

const NiceStatus = ({
  children,
  hits,
  queriedHits,
}: NiceStatusPropsNotFinished & NiceStatusPropsFinished) => {
  switch (children) {
    case Status.CREATED:
    case Status.RUNNING:
      return (
        <>
          Running
          <br />
          <span className="dashboard__body__notify_message">
            We&apos;ll notify you when it&apos;s done
          </span>
        </>
      );
    case Status.FAILED:
      return <>Failed</>;
    case Status.FINISHED: {
      if (hits === queriedHits) return <>Successful</>;
      const hitText = `hit${hits === 1 ? '' : 's'}`;
      return (
        <>
          Successful{' '}
          <span
            title={`Found ${hits} ${hitText} even though you queried ${queriedHits}`}
          >
            ({hits} {hitText})
          </span>
        </>
      );
    }
    default:
      return null;
  }
};

interface ActionsProps {
  id: Job['internalID'];
}

const Actions = ({ id }: ActionsProps) => {
  const dispatch = useDispatch();

  return (
    <span>
      <button type="button" disabled>
        rerun
      </button>
      <button type="button" onClick={() => dispatch(deleteJob(id))}>
        delete
      </button>
    </span>
  );
};

interface RowProps {
  job: Job;
}

const Row = memo(({ job }: RowProps) => (
  <Card>
    <span className="dashboard__body__name">
      <Name id={job.internalID}>{job.title}</Name>
    </span>
    <span className="dashboard__body__type">{job.type}</span>
    <span className="dashboard__body__time">
      {'timeSubmitted' in job && job.timeSubmitted && (
        <Time>{job.timeSubmitted}</Time>
      )}
    </span>
    <span className="dashboard__body__status">
      <NiceStatus
        hits={'data' in job ? job.data.hits : undefined}
        queriedHits={job.parameters.hits}
      >
        {job.status}
      </NiceStatus>
    </span>
    <span className="dashboard__body__actions">
      <Actions id={job.internalID} />
    </span>
    <span className="dashboard__body__id">
      {'remoteID' in job && <Link>{job.remoteID}</Link>}
    </span>
  </Card>
));

export default Row;
