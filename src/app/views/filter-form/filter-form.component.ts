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
  @Output() duplicate: EventEmitter<number> = new EventEmitter<number>();

  onAddFunnelStepClick() {
    this.addFunnelStep.emit();
  }

  onDelete(index: number) {
    this.form.removeAt(index);
    if (this.form.controls.length === 0) {
      this.onAddFunnelStepClick();
    }
  }

  onDuplicate(index: number) {
    this.duplicate.emit(index);
  }
}
