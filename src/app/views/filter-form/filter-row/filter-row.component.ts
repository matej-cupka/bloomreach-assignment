import {Component, EventEmitter, HostBinding, Input, OnDestroy, OnInit, Output} from '@angular/core';

import {IForm} from '../../../interfaces/form-filter.interface';
import {EventDataStore} from '../../../store/event-data.store';
import {IEvent} from '../../../interfaces/event.interface';
import {DestroySubject} from '../../../models/destroy-subject.model';
import {distinctUntilChanged, map, Observable, of, startWith, takeUntil, tap} from 'rxjs';
import {IProperty} from '../../../interfaces/property.interface';
import {getFilterPropertyGroup} from '../../../utils/form.utils';

@Component({
  selector: 'app-filter-row',
  templateUrl: './filter-row.component.html',
})
export class FilterRowComponent implements OnInit, OnDestroy {
  private readonly destroy$: DestroySubject = new DestroySubject();

  @HostBinding('class') readonly classList = '[ block ]';

  @Input() form!: IForm;
  @Input() index!: number;

  @Output() delete: EventEmitter<number> = new EventEmitter<number>();
  @Output() duplicate: EventEmitter<number> = new EventEmitter<number>();

  readonly vm$ = this.eventDataStore.vm$;
  readonly eventDisplayWithFn = (event: IEvent | null) => event?.type ?? '';

  doesntHaveEventProperties$: Observable<boolean> = of(true); // Base value until it gets set in ngOnInit
  eventProperties$: Observable<IProperty[] | undefined> = of(undefined); // Base value until it gets set in ngOnInit

  constructor(private readonly eventDataStore: EventDataStore) {
  }

  ngOnInit() {
    if (this.form === undefined) {
      throw new Error('no form');
    }
    if (this.index === undefined) {
      throw new Error('no index');
    }

    this.doesntHaveEventProperties$ = this.form.controls.properties.valueChanges.pipe(
      startWith([]),
      distinctUntilChanged((a, b) => a.length === b.length),
      map(value => value.length === 0),
    );

    this.eventProperties$ = this.form.controls.event.valueChanges.pipe(
      distinctUntilChanged((a, b) => a?.type === b?.type),
      tap(() => {
        // Event has changed, remove all existing property filters
        this.form.controls.properties.clear();
      }),
      map((event: IEvent | null) => event?.properties),
      takeUntil(this.destroy$),
    );
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

  onAddEventAttributeClick() {
    const formArrayProperties = this.form.controls.properties;
    formArrayProperties.push(getFilterPropertyGroup());
  }

  onDeleteClick() {
    this.delete.emit(this.index);
  }

  onDuplicateClick() {
    this.duplicate.emit(this.index);
  }

  onDeletePropertyClick(index: number) {
    this.form.controls.properties.removeAt(index);
  }
}
