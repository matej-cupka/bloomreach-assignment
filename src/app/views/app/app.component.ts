import {Component, HostBinding} from '@angular/core';

import {EventDataStore} from '../../store/event-data.store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  @HostBinding('class') readonly classList = '[ block ] [ w-full max-w-7xl ]';

  readonly vm$ = this.eventDataStore.vm$;

  constructor(private readonly eventDataStore: EventDataStore) {
  }
}
