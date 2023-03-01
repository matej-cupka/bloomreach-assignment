import {Injectable} from '@angular/core';
import {ComponentStore, OnStoreInit} from '@ngrx/component-store';
import {map, Observable, switchMap, tap} from 'rxjs';

import {IEventDataStoreState, IEventDataStoreViewModel} from '../interfaces/event-data-store.interface';
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

  readonly vm$: Observable<IEventDataStoreViewModel> = this.state$
    .pipe(
      map((state) => ({
        ...state,
        eventData: state.eventData ?? {
          events: [],
        },
      })),
    );

  readonly loadData = this.effect<void>((trigger$: Observable<void>) => trigger$.pipe(
    tap(() => this.patchState({isLoading: true})),
    switchMap(() => this.dataService.loadEventData()),
    tap((eventData) => this.patchState({isLoading: false, eventData})),
  ));
}
