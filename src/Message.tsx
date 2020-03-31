import React, { FC } from 'react';
import './styles/messages.scss';

export enum MessageLevel {
  warning = 'warning',
  failure = 'failure',
  success = 'success',
  info = 'info',
}

const Message: FC<{ body: JSX.Element; level?: MessageLevel }> = ({
  body,
  level = MessageLevel.info,
}) => (
  <section className={`alert alert--${level}`}>
    <section className="alert__content">
      <small>{body}</small>
    </section>
  </section>
);

export default Message;
