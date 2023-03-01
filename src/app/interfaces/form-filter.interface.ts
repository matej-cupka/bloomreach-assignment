import {FormControl, FormGroup} from '@angular/forms';

import {IEvent} from './event.interface';
import {IProperty} from './property.interface';
import {TOperator} from '../types/operator.type';

export type IFormFilter = FormGroup<IFormFilterGroup>;

export interface IFormFilterGroup {
  event: FormControl<IEvent | null>;
  filter: FormGroup<{
    property: FormControl<IProperty | null>;
    operator: FormControl<TOperator | null>;
    value: FormControl<any>; // TODO: Set type
  }>;
}
