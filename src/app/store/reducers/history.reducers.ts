// import the interface
import { HistoryItem } from '../models/history.model';
import { addHistory, deleteHistory } from '../actions/history.action';
import { createReducer, on } from '@ngrx/store';

const initialState: Array<HistoryItem> = [];

export const historyReducer = createReducer(
  initialState,
  on(addHistory, (state: any, { type, ...history }: any) => {
    const _state = state.filter((val: any) => val.login !== history.login)
    return ([history, ..._state]);
  }),
  on(deleteHistory, (state: any, { type, ...history }: any) => {
    const _state = state.filter((val: any) => val.login !== history.login)
    return ([..._state]);
  }),
);
