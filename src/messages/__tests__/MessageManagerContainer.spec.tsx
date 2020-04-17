import React from 'react';
import axios from 'axios';
import { cleanup, waitForElement, fireEvent } from '@testing-library/react';
import { v1 } from 'uuid';
import MessageManagerContainer from '../MessageManagerContainer';
import { act } from 'react-dom/test-utils';
import messagesInitialState from '../state/messagesInitialState';
import renderWithRedux from '../../__testHelpers__/renderWithRedux';
import { MessageFormat, MessageLevel } from '../types/messagesTypes';
import ResultsContainer from '../../results/ResultsContainer';
import searchInitialState from '../../search/state/searchInitialState';
import resultsInitialState, {
  ViewMode,
} from '../../results/state/resultsInitialState';

const getState = (content, format, locations = null) => ({
  messages: {
    active: [
      {
        id: v1(),
        content,
        format,
        level: MessageLevel.INFO,
        locations,
      },
    ],
  },
});

describe('Message Manager component', () => {
  test('should show pop-up message', () => {
    const content = 'Pop-up message content';
    const { getByText } = renderWithRedux(<MessageManagerContainer />, {
      initialState: getState(content, MessageFormat.POP_UP),
    });
    const messageContent = getByText(content);
    expect(messageContent).toBeTruthy;
  });

  test('should show in-page message when location is not specified', () => {
    const content = 'In-page message content';
    const { getByText } = renderWithRedux(<MessageManagerContainer />, {
      initialState: getState(content, MessageFormat.IN_PAGE),
    });
    const messageContent = getByText(content);
    expect(messageContent).toBeTruthy;
  });

  test('should show in-page message when location is specified and the router is at that location', () => {
    const content = 'In-page message content';
    const { getByText } = renderWithRedux(<MessageManagerContainer />, {
      initialState: getState(content, MessageFormat.IN_PAGE, [
        'UniProtKBResults',
      ]),
      route: '/uniprotkb?query=blah',
      path: '/uniprotkb',
    });
    const messageContent = getByText(content);
    expect(messageContent).toBeTruthy;
  });

  test('should not show in-page message when location is specified but the router is not at that location', () => {
    const content = 'In-page message content';
    const { queryByText } = renderWithRedux(<MessageManagerContainer />, {
      initialState: getState(content, MessageFormat.IN_PAGE, [
        'UniProtKBResults',
      ]),
      route: '/',
      path: '/',
    });
    const messageContent = queryByText(content);
    expect(messageContent).toBeNull();
  });
});
