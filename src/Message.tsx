import React, { FC } from 'react';
import './styles/messages.scss';
import MessageIcon from './svg/message-icon.svg';

export enum MessageLevel {
  warning = 'warning',
  failure = 'failure',
  success = 'success',
  info = 'info',
}

const iconSize = '1.125em';

const Message: FC<{ body: JSX.Element; level?: MessageLevel }> = ({
  body,
  level = MessageLevel.info,
}) => (
  <section className={`alert alert--${level}`}>
    <section className="alert__content">
      <MessageIcon width={iconSize} height={iconSize} />
      <small>{body}</small>
    </section>
  </section>
);

export default Message;
