import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AlertModule } from 'ngx-bootstrap/alert';
import { AppComponent } from './app.component';
import { TodoComponent } from './todo/todo.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { RouterModule } from '@angular/router';
//import { LocalStorage } from '@ngx-pwa/local-storage'
import { localStorageSync } from 'ngrx-store-localstorage';

import { appRoutes } from './routerConfig';
import { HomeComponent } from './home/home/home.component';
import { NoteReducer, UserReducer, NoteFilterReducer } from './store/reducers/note.reducer';
import { State } from './store/models/state.model'
import { StoreModule, ActionReducerMap, ActionReducer, MetaReducer } from '@ngrx/store';

const reducers: ActionReducerMap<State> = { filter_notes: NoteFilterReducer, notes: NoteReducer, user: UserReducer  };

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({keys: ['notes', 'user', 'filter_notes'], rehydrate: true})(reducer);
}
const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AlertModule.forRoot(),
    BrowserAnimationsModule,
    AccordionModule.forRoot(),
    BrowserModule, 
    RouterModule.forRoot(appRoutes, { onSameUrlNavigation: 'reload' }),
    StoreModule.forRoot(
        reducers,
        {metaReducers} 
       )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
