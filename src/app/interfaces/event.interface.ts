import {IProperty} from './property.interface';

export interface IEvent {
  type: string;
  properties: IProperty[];
}
