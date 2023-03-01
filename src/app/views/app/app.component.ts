import {Component, HostBinding} from '@angular/core';
import {FormArray, FormControl, FormGroup} from '@angular/forms';

import {EventDataStore} from '../../store/event-data.store';
import {IFormFilter, IFormFilterGroup} from '../../interfaces/form-filter.interface';
import {IEvent} from '../../interfaces/event.interface';
import {IProperty} from '../../interfaces/property.interface';
import {TOperator} from '../../models/operator.type';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @HostBinding('class') readonly classList = '[ block ] [ w-full max-w-7xl ]';

  formFilter: FormArray = new FormArray<IFormFilter>([
    this.getFilterGroup(),
  ]);

  readonly vm$ = this.eventDataStore.vm$;

  constructor(private readonly eventDataStore: EventDataStore) {
  }

  onDiscardFiltersClick() {
    this.formFilter.clear();
    this.addFilter();
  }

  addFilter() {
    this.formFilter.push(this.getFilterGroup());
  }

  private getFilterGroup(): FormGroup<IFormFilterGroup> {
    return new FormGroup<IFormFilterGroup>({
      event: new FormControl<IEvent['type'] | null>(null),
      filter: new FormGroup({
        property: new FormControl<IProperty['property'] | null>(null),
        operator: new FormControl<TOperator | null>(null),
        value: new FormControl<any>(null), // TODO: Set type
      }),
    });
  }
}
