import {Component, HostBinding, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';

import {IFormFilterGroup} from '../../interfaces/form-filter.interface';
import {EventDataStore} from '../../store/event-data.store';
import {IEvent} from '../../interfaces/event.interface';

@Component({
  selector: 'app-filter-row',
  templateUrl: './filter-row.component.html',
})
export class FilterRowComponent {
  @HostBinding('class') readonly classList = '[ block ]';

  @Input() form!: FormGroup<IFormFilterGroup>;
  @Input() index!: number;

  vm$ = this.eventDataStore.vm$;
  eventDisplayWithFn = (event: IEvent | null) => event?.type ?? '';

  constructor(private readonly eventDataStore: EventDataStore) {
  }
}
