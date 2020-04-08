import { v1 } from 'uuid';
import { action } from 'typesafe-actions';
import { Message } from '../types/messagesTypes';

export const ADD_MESSAGE = 'ADD_MESSAGE';
export const DELETE_MESSAGE = 'DELETE_MESSAGE';
export const CLEAR_MESSAGES = 'CLEAR_MESSAGES';

// Dispatched within actions that resolve network requests
export const addMessage = (message: Message) =>
  action(ADD_MESSAGE, {
    ...message,
    id: v1(),
  });

// Dispatched by the Message Manager when the user has either seen the message or they dismiss it
export const deleteMessage = (id: string) =>
  action(DELETE_MESSAGE, {
    id,
  });

export const clearMessages = () =>
  action(CLEAR_MESSAGES); 
