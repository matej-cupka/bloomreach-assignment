import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LetModule} from '@ngrx/component';
import {provideComponentStore} from '@ngrx/component-store';

// Angular Material Components
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSelectModule} from '@angular/material/select';
import {MatTabsModule} from '@angular/material/tabs';

// Store
import {EventDataStore} from './store/event-data.store';
// Components
import {AppComponent} from './views/app/app.component';
import {AutocompleteSearchComponent} from './views/form-field/autocomplete-search/autocomplete-search.component';
import {OperatorSelectorComponent} from './views/form-field/operator-selector/operator-selector.component';
import {ValueInputComponent} from './views/form-field/value-input/value-input.component';
import {FilterFormComponent} from './views/filter-form/filter-form.component';
import {FilterRowComponent} from './views/filter-form/filter-row/filter-row.component';
import {FilterPropertyComponent} from './views/filter-form/filter-row/filter-property/filter-property.component';

@NgModule({
  declarations: [
    // Components
    AppComponent,
    AutocompleteSearchComponent,
    OperatorSelectorComponent,
    ValueInputComponent,
    FilterFormComponent,
    FilterRowComponent,
    FilterPropertyComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    LetModule,
    // Angular Material Modules
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressBarModule,
    MatSelectModule,
    MatTabsModule,
  ],
  providers: [
    provideComponentStore(EventDataStore),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
