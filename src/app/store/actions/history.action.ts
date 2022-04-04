import { createAction, props } from '@ngrx/store';
import { HistoryItem } from '../models/history.model';

export const addHistory = createAction('[HISTORY] Add History', props<HistoryItem>());
export const deleteHistory = createAction('[HISTORY] Delete History', props<HistoryItem>());
