import { Component, Injectable, OnInit } from '@angular/core';
import { title } from 'process';
import { Subscriber, Subscription } from 'rxjs';
import { TodoService } from './todoService/todo.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { NoteItem } from '../store/models/noteItem.model';
import { State } from '../store/models/state.model';
import { BoxAction, InitAction, ItemAddAction, ItemDelAction ,ItemUpdateAction, SetEmtyFilterAction }  from '../store/actions/note.action';
import { User } from '../store/models/user.model';
//import {LocalStorage} from '@ngx-pwa/local-storage'

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  providers: [TodoService],
})
export class TodoComponent implements OnInit {
  
  todoList: Map<any,any>;
  itemClicked: any;
  name : String; 
  noteItems$: Observable<Array<NoteItem>>;
  noteFilterItems$: Observable<Array<NoteItem>>;
  user$: Observable<User>;
  id: number;
// private contentModal;

  constructor(private store: Store<State>) {  
   this.initFilter();
  }
  
  initFilter() {
    var notes: Array<NoteItem>;
    this.store.select((store) => store.notes ).forEach(
       (s) => notes = s);
    this.store.dispatch(new InitAction(notes));
  } 
  
  ngOnInit() {
    //TodoService.getInstance();
    //this.todoList = TodoService.getAll();
    //this.name = TodoService.username;
    var filternotes;
    this.store.select(s => s.filter_notes).forEach((e) => filternotes = e);
    console.log("filter ngoninit" + filternotes);
    /*
    if(filternotes.length>=0){
      this.noteItems$ = this.store.select(s => s.filter_notes);
    } else {
      this.noteItems$ = this.store.select(s => s.notes);
    } */
    this.noteItems$ = this.store.select(s => s.filter_notes);
    this.user$ = this.store.select(s => s.user);
    this.id = 0;
  }

    onAdd(itemTitle, itemContent){
     //TodoService.addTolist(itemTitle.value, itemContent.value, false);
      
     var noteItem =  {
        id: this.id++,
        name: itemTitle.value, 
        content: itemContent.value,
        isDone: false
      } 
      console.log("var : ", itemTitle.value);
     this.store.dispatch(new ItemAddAction(noteItem));
     this.initFilter();
     /*this.store.select(s => s)
      .subscribe(() => {
          this.store.dispatch(new AddItemAction(noteItem));
      });*/
     //NoteReducer(, new AddItemAction(noteItem));
     console.log("var : ", itemContent.value);
     itemTitle.value = null;
     itemContent.value = null;
     //this.locStorage.setItem("notes", this.noteItems$).subscribe(()=>{});
  }
       
  onDelete(note){
      //TodoService.removeFromlist(key);
      //this.noteItems$ = this.store.select(s => s != note );
      console.log("var : ", note);
      this.store.dispatch(new ItemDelAction(note));
      this.store.dispatch(new SetEmtyFilterAction());
      this.initFilter();
  }

  onShowModal(item){
    this.itemClicked = item;
  }

 onUpdate(modalTitle, modalContent){
   console.log("title : ", modalContent.value);
   //TodoService.updateOneTodo(keyClicked, titleModal.value, contentModal.value, false);
   var note = {
        id: this.itemClicked.id,
        name: modalTitle.value,
        content: modalContent.value,
        isDone: false
   }
   this.store.dispatch(new ItemUpdateAction(note));
   this.initFilter();
   this.itemClicked = null;
 }
 
 checkBoxOnChange(done, note){
      console.log("isdone : "+ done.checked + ", note : "+ note.name );
      var custom_note = {
        id: note.id,
        name: note.name,
        content: note.content,
        isDone: done.checked
      }
      this.store.dispatch(new BoxAction(custom_note));
 }

 hideModel(){
  this.itemClicked = null;
 }

}
