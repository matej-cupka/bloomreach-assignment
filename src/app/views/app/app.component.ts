import {Component, HostBinding} from '@angular/core';
import {FormArray, FormControl, FormGroup} from '@angular/forms';

import {EventDataStore} from '../../store/event-data.store';
import {IForm, IFormGroup, IFormProperty} from '../../interfaces/form-filter.interface';
import {IEvent} from '../../interfaces/event.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @HostBinding('class') readonly classList = '[ block ] [ w-full max-w-7xl ]';

  readonly formArrayFilter: FormArray = new FormArray<IForm>([
    this.getFilterGroup(),
  ]);

  readonly vm$ = this.eventDataStore.vm$;

  constructor(private readonly eventDataStore: EventDataStore) {
  }

  onDiscardFiltersClick() {
    this.formArrayFilter.clear({emitEvent: false});
    this.addFilter();
  }

  addFilter() {
    this.formArrayFilter.push(this.getFilterGroup());
  }

  private getFilterGroup(): FormGroup<IFormGroup> {
    return new FormGroup<IFormGroup>({
      event: new FormControl<IEvent | null>(null),
      properties: new FormArray<IFormProperty>([]),
    });
  }

  onApplyFiltersClick() {
    console.log(this.formArrayFilter.value);
  }
}
