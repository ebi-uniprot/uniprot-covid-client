import React, { FC } from 'react';
import * as actions from './state/messagesActions';
import { MessageType } from './types/messagesTypes';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { RootAction, RootState } from '../state/state-types';

type MessageManagerContainerProps = {
  activeMessages: MessageType[];
  deletedMessages: { [id: string]: boolean };
  deleteMessage: (id: string) => void;
  addMessage: (message: MessageType) => void;
};

const MessageManager: FC<MessageManagerContainerProps> = ({
  activeMessages,
  deletedMessages,
  deleteMessage,
  addMessage,
}) => {
  return <div>{JSON.stringify(activeMessages)}</div>;
};

const mapStateToProps = (state: RootState) => {
  return {
    activeMessages: state.messages.active,
    deletedMessages: state.messages.deleted,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) =>
  bindActionCreators(
    {
      deleteMessage: (id: string) => actions.deleteMessage(id),
      addMessage: (message: MessageType) => actions.addMessage(message),
    },
    dispatch
  );

const MessageManagerContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageManager);

export default MessageManagerContainer;
