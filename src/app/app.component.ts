import { Component, OnInit } from '@angular/core';
import { TodoService } from './todo/todoService/todo.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { State } from './store/models/state.model';
import { User } from './store/models/user.model';
import { AppDeconnect, InitAction, SearchByName } from './store/actions/note.action';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NoteItem } from './store/models/noteItem.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [TodoService]
})
export class AppComponent implements OnInit {
  
  title = 'myApp'; 
  user$: Observable<User>;

  constructor(private store: Store<State>,private route: ActivatedRoute
    ,private router: Router) { 
  }

  ngOnInit() {
    //TodoService.getInstance();
    this.user$ = this.store.select((store) => store.user);
  }

  searchByName(search){
     var notes: Array<NoteItem>;
     this.store.select((store) => store.notes ).forEach(
       (s) => notes = s);
     console.log("state : "+ Object.entries(notes)); 
     this.store.dispatch(new InitAction(notes));
     this.store.dispatch(new SearchByName(search.value));
     //location.reload();
  }

  deconnect(){
    this.store.dispatch(new AppDeconnect);
    //this.router.navigate(['/']);
    location.replace('/') 
  }
}
