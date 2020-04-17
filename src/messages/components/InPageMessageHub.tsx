import React, { FC } from 'react';
import { Message } from 'franklin-sites';
import { MessageType } from '../types/messagesTypes';

type InPageMessageHubProps = {
  messages: MessageType[];
  handleDismiss: (id: string) => void;
};

const InPageMessageHub: FC<InPageMessageHubProps> = ({
  messages = [],
  handleDismiss,
}) => (
  <div>
    {messages.map(({ level, content, id }) => (
      <Message key={id} level={level} onDismiss={() => handleDismiss(id)}>
        {content}
      </Message>
    ))}
  </div>
);

export default InPageMessageHub;
