import React, { FC, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { bindActionCreators, Dispatch } from 'redux';
import { groupBy } from 'lodash-es';
import * as actions from '../state/messagesActions';
import { MessageType, MessageFormat } from '../types/messagesTypes';
import { RootAction, RootState } from '../../app/state/rootInitialState';
import InPageMessageHub from './InPageMessageHub';
import PopUpMessageHub from './PopupMessageHub';
import { Location, PathToLocation } from '../../app/config/urls';

type MessageManagerContainerProps = {
  activeMessages: MessageType[];
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

  const currentLocation = PathToLocation[path] as Location;
  const filteredInPageMessages = inPageMessages.filter(
    ({ locations }) => !locations || locations.includes(currentLocation) // if no locations in the message object then show it everywhere
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
