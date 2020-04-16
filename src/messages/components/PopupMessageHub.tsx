import React, { useState, useEffect, createRef } from 'react';
import { Message } from 'franklin-sites';
import { useTransition } from 'react-spring';
import {
  MessageType,
  MessageLevel,
  MessageFormat,
} from '../types/messagesTypes';

// temporary messages for testing
// const messages: MessageType[] = [
//   {
//     id: 'msg1',
//     content: 'lorem',
//     format: MessageFormat.POP_UP,
//     level: MessageLevel.INFO,
//   },
//   {
//     id: 'msg2',
//     content: 'ipsum',
//     format: MessageFormat.POP_UP,
//     level: MessageLevel.SUCCESS,
//   },
// ];

const PopUpMessageHub: React.FC<{ messages: MessageType[] }> = ({
  messages,
}) => {
  const [refMap, setRefMap] = useState(() => new WeakMap());
  const [items, setItems] = useState([]);
  // const transitions = useTransition(messages, (message) => message.id, {
  //   from: { opacity: 0, height: 0 },
  //   enter: (message) => async (next) =>
  //     await next({
  //       opacity: 1,
  //       height: refMap.get(message).current.offsetHeight,
  //     }),
  //   // leave: item => async (next, cancel) => {
  //   //   cancelMap.set(item, cancel)
  //   //   await next({ life: '0%' })
  //   //   await next({ opacity: 0 })
  //   //   await next({ height: 0 })
  //   // },
  //   // onRest: (item) =>
  //   //   setItems((state) => state.filter((i) => i.key !== item.key)),
  //   // config: (item, state) =>
  //   //   state === 'leave' ? [{ duration: timeout }, config, config] : config,
  // });

  useEffect(() => {
    const refs = new WeakMap();
    messages.forEach((message) => refs.set(message, createRef));
    setRefMap(refs);
  }, []);

  return (
    <div>
      {messages.map((message) => (
        <Message level={message.level} ref={refMap.get(message)}>
          {message.content}
        </Message>
      ))}
    </div>
  );
};

export default PopUpMessageHub;
