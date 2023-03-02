import {Component, forwardRef, HostBinding, Input, OnDestroy, OnInit} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';
import {BehaviorSubject, combineLatest, filter, map, Observable, startWith, takeUntil} from 'rxjs';

import {DestroySubject} from '../../../models/destroy-subject.model';

@Component({
  selector: 'app-autocomplete-search',
  templateUrl: './autocomplete-search.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AutocompleteSearchComponent),
      multi: true,
    },
  ],
})
export class AutocompleteSearchComponent<T extends object> implements OnInit, OnDestroy, ControlValueAccessor {
  private readonly destroy$: DestroySubject = new DestroySubject();

  @HostBinding('class') readonly classList = 'block';

  @Input() placeholder: string = '';
  @Input() displayWith: (item: T) => string = (item: T) => `${item}`;

  private readonly _options$: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);

  @Input() set options(options: T[]) {
    this._options$.next(options);
  }

  private value: T | null = null;

  readonly fc: FormControl<T | string> = new FormControl<T | string>('', {nonNullable: true});
  readonly options$ = combineLatest([
    this.fc.valueChanges.pipe(startWith('')),
    this._options$,
  ])
    .pipe(
      map(([value, options]) => {
        if (typeof value !== 'string') {
          return options;
        }

        const valueLowerCase = value.toLowerCase();
        return options.filter((option: T) => this.displayWith(option).includes(valueLowerCase));
      }),
    );

  ngOnInit() {
    (
      this.fc.valueChanges
        .pipe(
          takeUntil(this.destroy$),
          filter(value => typeof value !== 'string'),
        ) as Observable<T>
    )
      .subscribe((value: T) => {
        this.onChange(value);
        this.onTouched();
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

  onOptionSelected(option: T) {
    this.value = option;
  }

  checkValue() {
    // Wait a bit until onOptionSelected gets called if option was selected
    setTimeout(() => {
      if (typeof this.fc.value === 'string' || !this._options$.value.includes(this.fc.value)) {
        this.fc.setValue(this.value ?? '');
      }
    }, 100);
  }

  // ControlValueAccessor
  private onChange: (value: T) => void = () => {
  };
  private onTouched: any = () => {
  };

  registerOnChange(fn: (value: T) => void) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  writeValue(value: T) {
    if (this._options$.value.includes(value)) {
      this.fc.setValue(value);
    }
  }

  setDisabledState(isDisabled: boolean) {
    if (isDisabled) {
      this.fc.disable();
    } else {
      this.fc.enable();
    }
  }
}
