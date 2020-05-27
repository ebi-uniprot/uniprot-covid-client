import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'franklin-sites';

import { Job } from '../../blast/types/blastJob';
import { Status } from '../../blast/types/blastStatuses';

import './styles/Dashboard.scss';

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
        {hh}-{mm}
      </span>
    </time>
  );
};

interface NiceStatusProps {
  children: Status;
}

const NiceStatus = ({ children }: NiceStatusProps) => {
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
    case Status.FINISHED:
      return <>Successful</>;
    default:
      return null;
  }
};

interface RowProps {
  tool: Job;
}

const Row = memo(({ tool }: RowProps) => (
  <Card>
    <span className="dashboard__body__name">{tool.title}</span>
    <span className="dashboard__body__type">{tool.type}</span>
    <span className="dashboard__body__time">
      {'timeSubmitted' in tool && tool.timeSubmitted && (
        <Time>{tool.timeSubmitted}</Time>
      )}
    </span>
    <span className="dashboard__body__status">
      <NiceStatus>{tool.status}</NiceStatus>
    </span>
    <span className="dashboard__body__actions">actions</span>
    <span className="dashboard__body__id">
      {'remoteID' in tool && <Link>{tool.remoteID}</Link>}
    </span>
  </Card>
));

export default Row;
