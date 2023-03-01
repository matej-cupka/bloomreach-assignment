import {IEventData} from './event-data.interface';

export interface IEventDataStoreState {
  isLoading: boolean;
  eventData?: IEventData;
}

export type IEventDataStoreViewModel = Required<IEventDataStoreState>;
