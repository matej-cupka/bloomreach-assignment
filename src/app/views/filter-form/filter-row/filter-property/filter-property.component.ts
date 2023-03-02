import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {distinctUntilChanged, Observable, of, takeUntil} from 'rxjs';

import {IFormProperty} from '../../../../interfaces/form-filter.interface';
import {IProperty} from '../../../../interfaces/property.interface';
import {DestroySubject} from '../../../../models/destroy-subject.model';
import {OPERATOR_NUMBER_ARR, OPERATOR_STRING_ARR} from '../../../../types/operator.type';

@Component({
  selector: 'app-filter-property',
  templateUrl: './filter-property.component.html',
})
export class FilterPropertyComponent implements OnInit, OnDestroy {
  private readonly destroy$: DestroySubject = new DestroySubject();

  @Input() form!: IFormProperty;
  @Input() properties!: IProperty[];
  @Output() delete: EventEmitter<void> = new EventEmitter<void>();

  readonly propertyDisplayWithFn = (property: IProperty | null) => property?.property ?? '';

  ngOnInit() {
    if (this.form === undefined) {
      throw new Error('no form');
    }
    if (this.properties === undefined) {
      throw new Error('no properties');
    }

    this.form.controls.property.valueChanges
      .pipe(
        distinctUntilChanged((a, b) => a?.type === b?.type),
        takeUntil(this.destroy$),
      )
      .subscribe((property: IProperty | null) => {
        if (property === null) {
          return;
        }
        // Set default operator type based on property type
        this.form.controls.operator.setValue(property.type === 'string'
          ? OPERATOR_STRING_ARR[0]
          : OPERATOR_NUMBER_ARR[0]);
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

  onDeleteClick() {
    this.delete.emit();
  }
}
