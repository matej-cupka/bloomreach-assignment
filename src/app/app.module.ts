import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {LetModule} from '@ngrx/component';
import {provideComponentStore} from '@ngrx/component-store';

// Angular Material Components
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressBarModule} from '@angular/material/progress-bar';

// Store
import {EventDataStore} from './store/event-data.store';
// Components
import {AppComponent} from './views/app/app.component';
import {FilterFormComponent} from './views/filter-form/filter-form.component';
import {FilterRowComponent} from './views/filter-row/filter-row.component';

@NgModule({
  declarations: [
    AppComponent,
    FilterFormComponent,
    FilterRowComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LetModule,
    // Angular Material Modules
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    MatProgressBarModule,
  ],
  providers: [
    provideComponentStore(EventDataStore),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
