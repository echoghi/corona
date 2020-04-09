import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { appState } from './reducers';

export const store = compose(applyMiddleware(thunk))(createStore)(appState);
