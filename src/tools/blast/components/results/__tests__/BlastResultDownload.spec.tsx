import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import BlastResultDownload from '../BlastResultDownload';

describe('Blast results download', () => {
  it('should change the format and download the correct', () => {
    const onCloseMock = jest.fn();
    const { getByTestId, getByRole } = render(
      <BlastResultDownload id="1234" onClose={onCloseMock} />
    );
    const select = getByTestId('file-format-select');
    fireEvent.change(select, 'accs');
    const submit = getByRole('button');
    fireEvent.click(submit);
    expect(onCloseMock).toHaveBeenCalled();
  });
});
