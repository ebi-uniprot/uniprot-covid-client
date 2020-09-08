import React from 'react';
import { Link, generatePath } from 'react-router-dom';

import {
  MessageFormat,
  MessageLevel,
  MessageTag,
} from '../../messages/types/messagesTypes';

import { Location, jobTypeToPath } from '../../app/config/urls';

import { Job } from '../types/toolsJob';

const parseXML = (xml: string) => {
  return new window.DOMParser().parseFromString(xml, 'text/xml');
};

type ServerError = {
  response?: { data?: string };
};

export const getServerErrorDescription = (error: ServerError) => {
  const data = error?.response?.data;
  if (!data) {
    return null;
  }
  const xml = parseXML(data);
  const description = xml.getElementsByTagName('description');
  const text = description[0]?.textContent;
  return text && text.replace('->', '→');
};

type getJobMessageProps = {
  job: Job;
  nHits?: number;
  errorDescription?: string;
};

export const getJobMessage = ({
  job,
  nHits,
  errorDescription,
}: getJobMessageProps) => {
  const message = {
    id: job.internalID,
    format: MessageFormat.POP_UP,
    tag: MessageTag.JOB,
    omitAndDeleteAtLocations: [Location.Dashboard],
  };

  // Error message
  if (errorDescription) {
    return {
      ...message,
      content: errorDescription,
      level: MessageLevel.FAILURE,
    };
  }

  // Success message
  let jobName;
  if (job.title) {
    jobName = `"${job.title}"`;
  } else if ('remoteID' in job) {
    jobName = job.remoteID;
  } else {
    jobName = '';
  }

  let href;
  if ('remoteID' in job) {
    const pathTemplate = jobTypeToPath(job.type, true);
    if (pathTemplate) {
      href = generatePath(pathTemplate, {
        id: job.remoteID,
        subPage: 'overview',
      });
    }
  }
  let hitsMessage = '';
  if (typeof nHits !== 'undefined') {
    hitsMessage = `, found ${nHits} hit${nHits === 1 ? '' : 's'}`;
  }

  return {
    ...message,
    content: (
      <>
        {job.type} job {href ? <Link to={href}>{jobName}</Link> : { jobName }}
        {` finished${hitsMessage}`}
      </>
    ),
    level: MessageLevel.SUCCESS,
  };
};
