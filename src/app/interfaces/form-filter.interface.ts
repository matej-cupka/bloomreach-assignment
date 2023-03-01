import {FormArray, FormControl, FormGroup} from '@angular/forms';

import {IEvent} from './event.interface';
import {IProperty} from './property.interface';
import {TOperator} from '../types/operator.type';

export type IForm = FormGroup<IFormGroup>;

export interface IFormGroup {
  event: FormControl<IEvent | null>;
  filters: FormArray<IFormFilterGroup>;
}

export type IFormFilterGroup = FormGroup<{
  property: FormControl<IProperty | null>;
  operator: FormControl<TOperator | null>;
  value: FormControl<any>; // TODO: Set type
}>
