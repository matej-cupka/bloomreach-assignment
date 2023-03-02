import {FormArray, FormControl, FormGroup} from '@angular/forms';

import {IEvent} from './event.interface';
import {IProperty} from './property.interface';
import {TOperator} from '../types/operator.type';

export type IForm = FormGroup<IFormGroup>;

export interface IFormGroup {
  event: FormControl<IEvent | null>;
  properties: FormArray<IFormProperty>;
}

export type IFormProperty = FormGroup<IFormPropertyGroup>

export interface IFormPropertyGroup {
  property: FormControl<IProperty | null>;
  operator: FormControl<TOperator | null>;
  value: FormControl<any>; // TODO: Set type
}

export interface IFormValue {
  event: IEvent | null;
  properties: IFormValueProperty[];
}

export interface IFormValueProperty {
  property: IProperty | null;
  operator: TOperator | null;
  value: any; // TODO: Set type
}
