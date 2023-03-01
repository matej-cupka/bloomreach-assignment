import {Injectable} from '@angular/core';
import {ComponentStore, OnStoreInit} from '@ngrx/component-store';
import {Observable, switchMap, tap} from 'rxjs';

import {IEventData} from '../interfaces/event-data.interface';
import {DataService} from '../services/data.service';

@Injectable()
export class EventDataStore extends ComponentStore<IEventDataStoreState> implements OnStoreInit {
  constructor(private dataService: DataService) {
    super({
      isLoading: true,
      eventData: undefined,
    });
  }

  ngrxOnStoreInit() {
    this.loadData();
  }

  readonly vm$: Observable<IEventDataStoreState> = this.state$;

  readonly loadData = this.effect<void>((trigger$: Observable<void>) => trigger$.pipe(
    tap(() => this.patchState({isLoading: true})),
    switchMap(() => this.dataService.loadEventData()),
    tap((eventData) => this.patchState({isLoading: false, eventData})),
  ));
}

export interface IEventDataStoreState {
  isLoading: boolean;
  eventData: IEventData | undefined;
}
