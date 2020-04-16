import React, { FC } from 'react';
import { Message } from 'franklin-sites';
import { useTransition } from 'react-spring';
import {
  MessageType,
  MessageLevel,
  MessageFormat,
} from '../types/messagesTypes';

type InPageMessageHubProps = {
  messages: MessageType[];
};

const InPageMessageHub: FC<InPageMessageHubProps> = ({ messages }) => (
  <div>
    {messages.map(({ level, content, id }) => (
      <Message key={id} level={level}>
        {content}
      </Message>
    ))}
  </div>
);

export default InPageMessageHub;
