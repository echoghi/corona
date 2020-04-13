import { createStore as createReduxStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { appState } from './reducers';

export const createStore = () => compose(applyMiddleware(thunk))(createReduxStore)(appState);
