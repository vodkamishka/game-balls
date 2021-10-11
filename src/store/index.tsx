import {composeWithDevTools} from 'redux-devtools-extension';
import {configureStore, combineReducers} from "@reduxjs/toolkit";
import reducer from './reducer';

const rootReducer = combineReducers({
    reducer
})

export const store = configureStore({
    reducer,
    composeWithDevTools,
});

export type RootState = ReturnType<typeof store.getState>