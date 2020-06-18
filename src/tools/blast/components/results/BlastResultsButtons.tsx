import React, { FC, lazy, useState, Suspense } from 'react';
import { DownloadIcon, BasketIcon } from 'franklin-sites';
import SidePanel from '../../../../shared/components/layouts/SidePanel';

const BlastResultsButtons: FC<{
  jobId: string;
}> = ({ jobId }) => {
  const BlastResultDownload = lazy(() =>
    import(/* webpackChunkName: "blast-download" */ './BlastResultDownload')
  );

  const [displayDownloadPanel, setDisplayDownloadPanel] = useState(false);

  return (
    <>
      {displayDownloadPanel && (
        <Suspense fallback>
          <SidePanel>
            <BlastResultDownload
              id={jobId}
              onToggleDisplay={() =>
                setDisplayDownloadPanel(!displayDownloadPanel)
              }
            />
          </SidePanel>
        </Suspense>
      )}
      <div className="button-group">
        <button type="button" className="button tertiary disabled">
          Blast
        </button>
        <button type="button" className="button tertiary disabled">
          Align
        </button>
        <button
          type="button"
          className="button tertiary"
          onClick={() => setDisplayDownloadPanel(!displayDownloadPanel)}
        >
          <DownloadIcon />
          Download
        </button>
        <button type="button" className="button tertiary disabled">
          <BasketIcon />
          Add
        </button>
      </div>
    </>
  );
};

export default BlastResultsButtons;
