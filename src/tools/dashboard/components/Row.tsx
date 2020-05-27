import React, { memo, FocusEvent } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Card } from 'franklin-sites';

import { Job } from '../../blast/types/blastJob';
import { Status } from '../../blast/types/blastStatuses';

import './styles/Dashboard.scss';
import { updateJobTitle } from '../../state/toolsActions';

interface NameProps {
  id: string;
  children: string;
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
    <span className="dashboard__body__name">
      <Name id={tool.internalID}>{tool.title}</Name>
    </span>
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
