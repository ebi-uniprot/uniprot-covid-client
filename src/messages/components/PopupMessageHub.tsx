import React, { useState, useEffect, createRef } from 'react';
import { Message } from 'franklin-sites';
import { useTransition, animated } from 'react-spring';
import { MessageType } from '../types/messagesTypes';
import '../styles/popupMessageHub.scss';

const PopUpMessageHub: React.FC<{ messages: MessageType[] }> = ({
  messages,
}) => {
  // const [refMap, setRefMap] = useState(() => new WeakMap());

  const transitions = useTransition(messages, (item) => item.id, {
    from: { opacity: 0 },
    enter: (item) => async (next) =>
      await next({
        opacity: 1,
      }),
  });

  // useEffect(() => {
  //   const refs = new WeakMap();
  //   messages.forEach((message) => refs.set(message, createRef));
  //   setRefMap(refs);
  // }, []);

  console.log(transitions);

  return (
    <div className="popup-message-container">
      {transitions.map(({ key, item: message, props: { ...style } }) => {
        return (
          <animated.div key={key} style={style}>
            <Message level={message.level}>{message.content}</Message>
          </animated.div>
        );
      })}
    </div>
  );
};

export default PopUpMessageHub;
