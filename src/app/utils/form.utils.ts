import {FormArray, FormControl, FormGroup} from '@angular/forms';

import {
  IForm,
  IFormGroup,
  IFormProperty,
  IFormPropertyGroup,
  IFormValueMapped,
  IFormValuePropertyValue,
} from '../interfaces/form-filter.interface';
import {IEvent} from '../interfaces/event.interface';
import {IProperty} from '../interfaces/property.interface';
import {TOperator} from '../types/operator.type';

export const getFilterGroup = (propertiesCount: number = 0): IForm =>
  new FormGroup<IFormGroup>({
    event: new FormControl<IEvent | null>(null),
    properties: new FormArray<IFormProperty>(
      [...Array(propertiesCount).keys()]
        .map(() => getFilterPropertyGroup()),
    ),
  });

export const getFilterPropertyGroup = (): IFormProperty =>
  new FormGroup<IFormPropertyGroup>({
    property: new FormControl<IProperty | null>(null),
    operator: new FormControl<TOperator | null>(null),
    value: new FormControl<IFormValuePropertyValue>(null),
  });

export const getMappedFormValue = (form: FormArray<IForm>): IFormValueMapped[] =>
  form.value.map((event) => ({
    event: event.event?.type,
    properties: event.properties?.map((property) => ({
      property: property.property?.property ?? null,
      operator: property.operator ?? null,
      value: property.value ?? null,
    })),
  }));
