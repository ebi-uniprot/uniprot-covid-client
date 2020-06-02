import React, { memo, useLayoutEffect, useRef, FocusEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Card, RefreshIcon, BinIcon } from 'franklin-sites';

import { Job, FinishedJob } from '../../blast/types/blastJob';
import { Status } from '../../blast/types/blastStatuses';

import { updateJobTitle, deleteJob } from '../../state/toolsActions';

import { LocationToPath, Location } from '../../../app/config/urls';

import './styles/Dashboard.scss';

interface NameProps {
  id: Job['internalID'];
  children: Job['title'];
}

const Name = ({ children, id }: NameProps) => {
  const dispatch = useDispatch();

  const handleBlur = (event: FocusEvent<HTMLSpanElement>) => {
    const text = event.target.innerText.trim();
    if (text !== children) dispatch(updateJobTitle(id, text));
  };

  return (
    <span
      contentEditable
      onBlur={handleBlur}
      onKeyDown={(event) => event.stopPropagation()}
    >
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
type NiceStatusProps = NiceStatusPropsFinished & NiceStatusPropsNotFinished;

const NiceStatus = ({ children, hits, queriedHits }: NiceStatusProps) => {
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
    <span className="dashboard__body__actions">
      <button type="button" disabled title="resubmit this job">
        <RefreshIcon />
      </button>
      <button
        type="button"
        onClick={() => dispatch(deleteJob(id))}
        title="delete this job"
      >
        <BinIcon />
      </button>
    </span>
  );
};

const keyframesForNew = {
  opacity: [0, 1],
  transform: ['scale(0.8)', 'scale(1.05)', 'scale(1)'],
};
const animationOptionsForNew: KeyframeAnimationOptions = {
  duration: 500,
  easing: 'ease-in-out',
  fill: 'both',
};
const keyframesForStatusUpdate = {
  opacity: [1, 0.5, 1, 0.5, 1],
};
const animationOptionsForStatusUpdate: KeyframeAnimationOptions = {
  duration: 1000,
  fill: 'both',
};

interface RowProps {
  job: Job;
}

interface CustomLocationState {
  parameters?: Job['parameters'];
}

const Row = memo(({ job }: RowProps) => {
  const history = useHistory();
  const ref = useRef<HTMLElement>(null);
  const firstTime = useRef<boolean>(true);

  let jobLink: string | undefined;
  if ('remoteID' in job) {
    jobLink = `${LocationToPath[Location.Blast]}/${job.remoteID}`;
  }

  const handleClick = () => {
    if (!jobLink) return;
    history.push(jobLink);
  };

  // if the state of the current location contains the parameters from this job,
  // it means we just arrived from a submission form page and this is the job
  // that was just added, animate it to have it visually represented as "new"
  useLayoutEffect(() => {
    if (
      job.parameters !==
      (history.location.state as CustomLocationState)?.parameters
    ) {
      return;
    }
    const card = ref.current?.parentElement?.parentElement;
    if (!(card && 'animate' in card)) {
      return;
    }
    card.animate(keyframesForNew, animationOptionsForNew);
  }, [history, job.parameters]);

  // if the status of the current job changes, make it "flash"
  useLayoutEffect(() => {
    const card = ref.current?.parentElement?.parentElement;
    if (!(card && 'animate' in card)) {
      return;
    }
    if (firstTime.current) {
      firstTime.current = false;
      return;
    }
    card.animate(keyframesForStatusUpdate, animationOptionsForStatusUpdate);
  }, [job.status]);

  return (
    <Card onClick={handleClick}>
      <span className="dashboard__body__name" ref={ref}>
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
        {'remoteID' in job && jobLink && (
          <Link to={jobLink}>{job.remoteID}</Link>
        )}
      </span>
    </Card>
  );
});

export default Row;
