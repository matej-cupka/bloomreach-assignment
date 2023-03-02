import {Component, HostBinding} from '@angular/core';
import {FormArray} from '@angular/forms';

import {EventDataStore} from '../../store/event-data.store';
import {IForm, IFormValue} from '../../interfaces/form-filter.interface';
import {getFilterGroup, getMappedFormValue} from '../../utils/form.utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @HostBinding('class') readonly classList = '[ block ] [ w-full max-w-7xl ]';

  readonly formArrayFilter: FormArray<IForm> = new FormArray<IForm>([
    getFilterGroup(),
  ]);

  readonly vm$ = this.eventDataStore.vm$;

  constructor(private readonly eventDataStore: EventDataStore) {
  }

  onDiscardFiltersClick() {
    this.formArrayFilter.clear({emitEvent: false});
    this.addFilter();
  }

  addFilter() {
    this.formArrayFilter.push(getFilterGroup());
  }

  onDuplicate(index: number) {
    const value: IFormValue = this.formArrayFilter.controls[index].value as IFormValue;

    const formGroup = getFilterGroup(value.properties?.length ?? 0);
    formGroup.setValue(value);

    this.formArrayFilter.insert(index + 1, formGroup);
  }

  onApplyFiltersClick() {
    const mappedValue = getMappedFormValue(this.formArrayFilter);
    console.log(mappedValue);
    console.log(JSON.stringify(mappedValue, null, 2));
  }
}
