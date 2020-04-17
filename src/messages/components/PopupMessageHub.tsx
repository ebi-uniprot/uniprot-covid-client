import React from 'react';
import { Message } from 'franklin-sites';
import { useTransition, animated } from 'react-spring';
import { MessageType } from '../types/messagesTypes';
import '../styles/popupMessageHub.scss';

const PopUpMessageHub: React.FC<{ messages: MessageType[] }> = ({
  messages,
}) => {
  const transitions = useTransition(messages, (item) => item.id, {
    from: { opacity: 0 },
    enter: {
      opacity: 1,
    },
    exit: {
      opacity: 0,
    },
  });

  return (
    <div className="popup-message-container">
      {transitions.map(({ key, item, props }) => {
        return (
          <animated.div key={key} style={props}>
            <Message level={item.level}>{item.content}</Message>
          </animated.div>
        );
      })}
    </div>
  );
};

export default PopUpMessageHub;
