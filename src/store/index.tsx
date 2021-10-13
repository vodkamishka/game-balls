import {composeWithDevTools} from 'redux-devtools-extension';
import {combineReducers, configureStore} from "@reduxjs/toolkit";
import reducer from './reducer';

export const rootReducer = combineReducers({
    balls: reducer
})

export const store = configureStore({
    reducer: rootReducer
});

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch