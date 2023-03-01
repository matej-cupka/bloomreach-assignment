import {Component, HostBinding, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';

import {IFormGroup} from '../../interfaces/form-filter.interface';
import {EventDataStore} from '../../store/event-data.store';
import {IEvent} from '../../interfaces/event.interface';

@Component({
  selector: 'app-filter-row',
  templateUrl: './filter-row.component.html',
})
export class FilterRowComponent implements OnInit {
  @HostBinding('class') readonly classList = '[ block ]';

  @Input() form!: FormGroup<IFormGroup>;
  @Input() index!: number;

  readonly vm$ = this.eventDataStore.vm$;
  readonly eventDisplayWithFn = (event: IEvent | null) => event?.type ?? '';

  constructor(private readonly eventDataStore: EventDataStore) {
  }

  ngOnInit() {
    if (this.form === undefined) {
      throw new Error('no form');
    }
    if (this.index === undefined) {
      throw new Error('no index');
    }
  }

  onRefineMoreClick() {
    // TODO
  }
}
