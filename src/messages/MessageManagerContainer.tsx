import React, { FC, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { bindActionCreators, Dispatch } from 'redux';
import { groupBy } from 'lodash';
import * as actions from './state/messagesActions';
import { MessageType, MessageFormat } from './types/messagesTypes';
import { RootAction, RootState } from '../state/state-types';
import InPageMessageHub from './components/InPageMessageHub';
import PopUpMessageHub from './components/PopupMessageHub';
import { Location, PathToLocation } from '../urls';

type MessageManagerContainerProps = {
  activeMessages: MessageType[];
  deletedMessages: { [id: string]: boolean };
  deleteMessage: (id: string) => void;
} & RouteComponentProps;

const MessageManager: FC<MessageManagerContainerProps> = ({
  activeMessages,
  deleteMessage,
  match: { path },
}) => {
  const {
    [MessageFormat.IN_PAGE]: inPageMessages = [],
    [MessageFormat.POP_UP]: popUpMessages = [],
  } = groupBy(activeMessages, ({ format }) => format);

  const currentLocation = PathToLocation.get(path as Location);
  const filteredInPageMessages = inPageMessages.filter(
    ({ locations }) =>
      !locations || // if no locations in the message object then show it everywhere
      (locations && currentLocation && locations.includes(currentLocation))
  );

  return (
    <Fragment>
      <InPageMessageHub
        messages={filteredInPageMessages}
        onDismiss={deleteMessage}
      />
      <PopUpMessageHub messages={popUpMessages} onDismiss={deleteMessage} />
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
    },
    dispatch
  );

const MessageManagerContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MessageManager)
);

export default MessageManagerContainer;
