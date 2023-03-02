import {Component, forwardRef, HostBinding, OnDestroy, OnInit} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';
import {BehaviorSubject, distinctUntilChanged, takeUntil} from 'rxjs';

import {OPERATOR_NUMBER_ARR, OPERATOR_STRING_ARR, TOperator} from '../../../types/operator.type';
import {DestroySubject} from '../../../models/destroy-subject.model';

@Component({
  selector: 'app-operator-selector',
  templateUrl: './operator-selector.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => OperatorSelectorComponent),
      multi: true,
    },
  ],
})
export class OperatorSelectorComponent implements OnInit, OnDestroy, ControlValueAccessor {
  private readonly destroy$: DestroySubject = new DestroySubject();

  @HostBinding('class') classList = 'block';

  readonly fc: FormControl<TOperator> = new FormControl<TOperator>(OPERATOR_STRING_ARR[0], {nonNullable: true});

  private readonly _operatorType$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  readonly operatorType$ = this._operatorType$.pipe(distinctUntilChanged());
  readonly OPERATOR_STRING_ARR = OPERATOR_STRING_ARR;
  readonly OPERATOR_NUMBER_ARR = OPERATOR_NUMBER_ARR;

  ngOnInit() {
    this.fc.valueChanges
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe((value: TOperator) => {
        this.onChange(value);
        this.onTouched();
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

  onSelectDropdownOpened() {
    // After opening/closing dropdown set the operator type back to currently selected operator's type
    this._operatorType$.next(OPERATOR_STRING_ARR.includes(this.fc.value as any) ? 0 : 1);
  }

  onSelectedIndexChange(operatorType: number) {
    this._operatorType$.next(operatorType);
  }

  // ControlValueAccessor
  private onChange: (value: TOperator) => void = () => {
  };
  private onTouched: any = () => {
  };

  registerOnChange(fn: (value: TOperator) => void) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  writeValue(value: TOperator) {
    this._operatorType$.next(OPERATOR_STRING_ARR.includes(value as any) ? 0 : 1);
    this.fc.setValue(value);
  }

  setDisabledState(isDisabled: boolean) {
    if (isDisabled) {
      this.fc.disable();
    } else {
      this.fc.enable();
    }
  }
}
