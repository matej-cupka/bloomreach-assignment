import {FormControl, FormGroup} from '@angular/forms';

import {IEvent} from './event.interface';
import {IProperty} from './property.interface';
import {TOperator} from '../models/operator.type';

export type IFormFilter = FormGroup<IFormFilterGroup>;

export interface IFormFilterGroup {
  event: FormControl<IEvent['type'] | null>;
  filter: FormGroup<{
    property: FormControl<IProperty['property'] | null>;
    operator: FormControl<TOperator | null>;
    value: FormControl<any>; // TODO: Set type
  }>;
}
