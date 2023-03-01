import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {IEventData} from '../interfaces/event-data.interface';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private readonly http: HttpClient) {
  }

  loadEventData(): Observable<IEventData> {
    return this.http.get<IEventData>('https://br-fe-assignment.github.io/customer-events/events.json');
  }
}
