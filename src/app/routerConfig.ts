import { Routes } from '@angular/router';
//import { AppComponent } from './app.component';
import { TodoComponent } from './todo/todo.component';
import { HomeComponent } from './home/home/home.component';

export const appRoutes: Routes = [
  { path: '', 
    component: HomeComponent 
  },
  {
    path: 'todo',
    component: TodoComponent
  }
];