import React, { FC } from 'react';
import { Loader, CodeBlock, InfoList } from 'franklin-sites';

import ErrorHandler from '../../../../shared/components/error-pages/ErrorHandler';

import { UseDataAPIState } from '../../../../shared/hooks/useDataApi';

import toolsURLs from '../../../config/urls';

import {
  ServerParameters,
  PublicServerParameters,
} from '../../types/blastServerParameters';
import { JobTypes } from '../../../types/toolsJobTypes';

const inputToCurl = (input: Partial<ServerParameters>, jobType: JobTypes) => {
  return `curl ${Object.entries(input)
    .map(
      ([key, value]) =>
        `-F ${
          typeof value === 'string' && value.includes("'") ? '$' : ''
        }'${key}=${value}'`
    )
    .join(' \\\n')} \\\n${toolsURLs(jobType).runUrl}`;
};

type Props = {
  id: string;
  inputParamsData: Partial<UseDataAPIState<PublicServerParameters>>;
  jobType: JobTypes;
};

const BlastResultToolInput: FC<Props> = ({ id, inputParamsData, jobType }) => {
  const { loading, data, error, status } = inputParamsData;

  if (loading) return <Loader />;

  if (error || !data) return <ErrorHandler status={status} />;

  const infoData = Object.entries(data).map(([key, value]) => {
    return {
      title: key,
      content: <CodeBlock lightMode>{value}</CodeBlock>,
    };
  });

  return (
    <section>
      <p>
        The job with UUID {id} has been submitted with these raw input values:
      </p>
      <InfoList infoData={infoData} />
      <p>
        You can refer to the documentation for these values on the{' '}
        <a href="https://www.ebi.ac.uk/seqdb/confluence/pages/viewpage.action?pageId=94147939#NCBIBLAST+HelpandDocumentation-RESTAPI">
          API documentation page
        </a>
      </p>
      <p>
        Using{' '}
        <a
          href="https://curl.haxx.se/"
          target="_blank"
          rel="noreferrer noopener"
        >
          curl
        </a>
        , you could run a new job on the command line with the same input like
        this:
        <br />
        <CodeBlock lightMode>
          {inputToCurl({ email: '<enter your email here>', ...data }, jobType)}
        </CodeBlock>
      </p>
    </section>
  );
};

export default BlastResultToolInput;
