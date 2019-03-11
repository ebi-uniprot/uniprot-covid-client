# 4. State Management

Date: 2019-03-11

## Status

Accepted

## Context

The state of data and UI will grow in the application as the development goes on. There needs to be good state management mechanism to handle this, particularly when components will require interaction across the component hierarchy.

## Decision

[Redux](https://redux.js.org/) will be used for state management. It is a centralised state management container that can handle data and UI state.

## Consequences

Redux is a predictable state container for JavaScript that uses actions (objects) and reducers (functions) to centralize application state (an object which is also known as the store). The library promotes the use of pure functions but this is unobtainable in practice as network requests will inevitably cause side-effects. The library `redux-thunk` is community-accepted and will be used to handle these situations. Redux requires verbose code to be written in multiple files.
