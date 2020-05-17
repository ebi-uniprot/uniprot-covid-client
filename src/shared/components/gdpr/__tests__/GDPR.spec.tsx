import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import GDPR from '../GDPR';

describe('GDPR', () => {
  const store = {};
  beforeEach(() => {
    spyOn(localStorage, 'getItem').and.callFake(key => {
      store[key];
    });
    spyOn(localStorage, 'setItem').and.callFake((key, value) => {
      store[key] = value;
    });
  });

  test('should render', () => {
    const { asFragment } = render(<GDPR />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('should add UP_COVID_GDPR: true to localStorage', () => {
    const { getByText } = render(<GDPR />);
    const acceptButton = getByText('Accept');
    fireEvent.click(acceptButton);
    expect(localStorage.getItem('UP_COVID_GDPR')).toBe('true');
  });

  test('if UP_COVID_GDPR in localStorage, do not render component', () => {
    localStorage.setItem('UP_COVID_GDPR', 'true');
    const { queryByText } = render(<GDPR />);
    const text = queryByText('Privacy Notice');
    expect(text).toBeNull();
  });
});
