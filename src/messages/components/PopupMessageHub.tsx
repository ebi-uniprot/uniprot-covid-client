import React from 'react';
import { Message } from 'franklin-sites';
import { useTransition } from 'react-spring';
import {
  MessageType,
  MessageLevel,
  MessageFormat,
} from '../types/messagesTypes';

// temporary messages for testing
const messages: MessageType[] = [
  {
    id: 'msg1',
    content: 'lorem',
    format: MessageFormat.POP_UP,
    level: MessageLevel.INFO,
  },
  {
    id: 'msg2',
    content: 'ipsum',
    format: MessageFormat.POP_UP,
    level: MessageLevel.SUCCESS,
  },
];

const PopUpMessageHub: React.FC<{}> = () => {
  return (
    <div>
      {messages.map((message) => (
        <Message level={message.level}>{message.content}</Message>
      ))}
    </div>
  );
};

export default PopUpMessageHub;
