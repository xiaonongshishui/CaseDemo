import {combineReducers, createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import { CaseReducer as Case } from './Case';

const reducers = combineReducers({
    Case
});

const store = createStore(reducers, applyMiddleware(thunk));

export default store;