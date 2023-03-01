import {Component, HostBinding, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {IFormFilterGroup} from '../../interfaces/form-filter.interface';

@Component({
  selector: 'app-filter-row',
  templateUrl: './filter-row.component.html',
})
export class FilterRowComponent {
  @HostBinding('class') readonly classList = '[ block ]';

  @Input() form!: FormGroup<IFormFilterGroup>;
  @Input() index!: number;
}
