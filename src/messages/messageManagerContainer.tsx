import React, { FC, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { groupBy } from 'lodash';
import * as actions from './state/messagesActions';
import { MessageType, MessageFormat } from './types/messagesTypes';
import { RootAction, RootState } from '../state/state-types';
import InPageMessageHub from './components/InPageMessageHub';
import PopUpMessageHub from './components/PopupMessageHub';

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
  const { IN_PAGE: inPageMessages, POP_UP: popUpMessages } = groupBy(
    activeMessages,
    ({ format }) => format
  );
  console.log(activeMessages, inPageMessages, popUpMessages);
  return (
    <Fragment>
      <InPageMessageHub messages={inPageMessages} />
      <PopUpMessageHub messages={popUpMessages} />
    </Fragment>
  );
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
