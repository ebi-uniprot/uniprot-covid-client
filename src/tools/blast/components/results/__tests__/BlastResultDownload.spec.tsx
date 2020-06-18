import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import BlastResultDownload from '../BlastResultDownload';

describe('Blast results download', () => {
  it('should change the format and download the correct', () => {
    const onCloseMock = jest.fn();

    const { getByTestId } = render(
      <BlastResultDownload id="1234" onToggleDisplay={onCloseMock} />
    );
    const select = getByTestId('file-format-select');
    fireEvent.change(select, 'accs');
    const submit = getByTestId('submit-blast');
    fireEvent.click(submit);
    expect(onCloseMock).toHaveBeenCalled();
  });
});
