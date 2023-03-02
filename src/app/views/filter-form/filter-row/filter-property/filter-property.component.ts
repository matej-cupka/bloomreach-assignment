import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {IFormProperty} from '../../../../interfaces/form-filter.interface';
import {IProperty} from '../../../../interfaces/property.interface';

@Component({
  selector: 'app-filter-property',
  templateUrl: './filter-property.component.html',
})
export class FilterPropertyComponent implements OnInit {
  @Input() form!: IFormProperty;
  @Input() properties!: IProperty[];
  @Output() delete: EventEmitter<number> = new EventEmitter<number>();

  readonly propertyDisplayWithFn = (property: IProperty | null) => property?.property ?? '';

  ngOnInit() {
    if (this.form === undefined) {
      throw new Error('no form');
    }
    if (this.properties === undefined) {
      throw new Error('no properties');
    }
  }
}
