import {Component, forwardRef, Input, OnDestroy, OnInit} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';
import {BehaviorSubject, combineLatest, distinctUntilChanged, takeUntil} from 'rxjs';

import {OPERATOR_VALUE_TYPE, TOperator, TOperatorValueType} from '../../../types/operator.type';
import {DestroySubject} from '../../../models/destroy-subject.model';
import {IFormValuePropertyValue} from '../../../interfaces/form-filter.interface';

@Component({
  selector: 'app-value-input',
  templateUrl: './value-input.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ValueInputComponent),
      multi: true,
    },
  ],
})
export class ValueInputComponent implements OnInit, OnDestroy, ControlValueAccessor {
  private readonly destroy$: DestroySubject = new DestroySubject();

  private readonly _valueType$ = new BehaviorSubject<TOperatorValueType>('string');
  readonly valueType$ = this._valueType$.pipe(distinctUntilChanged());

  @Input() set operator(operator: TOperator) {
    this._valueType$.next(OPERATOR_VALUE_TYPE[operator]);
  }

  readonly fc1: FormControl<string> = new FormControl<string>('', {nonNullable: true});
  readonly fc2: FormControl<string> = new FormControl<string>('', {nonNullable: true});

  ngOnInit() {
    this.valueType$.pipe(
      takeUntil(this.destroy$),
    )
      .subscribe((valueType: TOperatorValueType) => {
        if (valueType === 'string') {
          this.fc1.setValue('');
          this.fc2.setValue('');
        } else {
          this.fc1.setValue('0');
          this.fc2.setValue('0');
        }

        if (valueType === 'numberArr') {
          this.fc2.enable();
        } else {
          this.fc2.disable();
        }
      });

    combineLatest([
      this.fc1.valueChanges,
      this.fc2.valueChanges,
    ])
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe((value: string[]) => {
        const [v1, v2] = value;


        switch (this._valueType$.value) {
          case 'string':
            this.onChange(v1);
            break;
          case 'number':
            this.onChange(parseFloat(v1));
            break;
          case 'numberArr':
            this.onChange([parseFloat(v1), parseFloat(v2)]);
            break;
        }

        this.onTouched();
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

  // ControlValueAccessor
  private onChange: (value: IFormValuePropertyValue) => void = () => {
  };
  private onTouched: any = () => {
  };

  registerOnChange(fn: (value: IFormValuePropertyValue) => void) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  writeValue(value: IFormValuePropertyValue) {
    if (Array.isArray(value)) {
      const [v1, v2] = value;
      this.fc1.setValue(`${v1}`);
      this.fc2.setValue(`${v2}`);
    } else {
      this.fc1.setValue(value ? `${value}` : '');
      this.fc2.setValue('');
    }
  }

  setDisabledState(isDisabled: boolean) {
    if (isDisabled) {
      this.fc1.disable();
      this.fc2.disable();
    } else {
      this.fc1.enable();
      this.fc2.enable();
    }
  }
}
