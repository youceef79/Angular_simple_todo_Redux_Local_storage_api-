import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../todo/todoService/todo.service'
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { State } from '../../store/models/state.model';
import { User } from '../../store/models/user.model';
import { UserAction } from 'src/app/store/actions/note.action';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [TodoService]
})
export class HomeComponent implements OnInit {
 
  private todoService: TodoService;  
  user$: Observable<User>;

  constructor(private store: Store<State>) { 
  }

  ngOnInit() {
    TodoService.getInstance();
  }

  apply(name) {
    TodoService.setName(name.value);
    console.log("name : "+ TodoService.username);
    var user = { username: name.value };
    this.store.dispatch(new UserAction(user));
 }

}
