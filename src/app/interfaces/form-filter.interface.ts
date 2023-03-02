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
export type IFormPropertyValue = FormControl<string | number | [number, number] | null>;

export interface IFormPropertyGroup {
  property: FormControl<IProperty | null>;
  operator: FormControl<TOperator | null>;
  value: IFormPropertyValue;
}

export interface IFormValue {
  event: IEvent | null;
  properties: IFormValueProperty[];
}

export type IFormValuePropertyValue = string | number | [number, number] | null;

export interface IFormValueProperty {
  property: IProperty | null;
  operator: TOperator | null;
  value: IFormValuePropertyValue;
}

export interface IFormValueMapped {
  event: IEvent['type'] | undefined,
  properties: IFormValuePropertyMapped[] | undefined;
}
export interface IFormValuePropertyMapped {
  property: IProperty['property'] | null;
  operator: TOperator | null;
  value: IFormValuePropertyValue;
}
