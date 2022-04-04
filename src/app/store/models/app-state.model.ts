import { HistoryItem } from './history.model';

export interface AppState {
  readonly history: Array<HistoryItem>;
}