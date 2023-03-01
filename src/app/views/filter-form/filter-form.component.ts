import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormArray} from '@angular/forms';

import {IForm} from '../../interfaces/form-filter.interface';

@Component({
  selector: 'app-filter-form',
  templateUrl: './filter-form.component.html',
})
export class FilterFormComponent {
  @Input() form!: FormArray<IForm>;
  @Output() addFunnelStep: EventEmitter<void> = new EventEmitter<void>();

  onAddFunnelStepClick() {
    this.addFunnelStep.emit();
  }
}
