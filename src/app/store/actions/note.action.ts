import { Action } from '@ngrx/store';
import { NoteItem } from '../models/noteItem.model';
import { User } from '../models/user.model';

/*
enum NoteActionType {
  ADD_ITEM = 'Add',
}
*/

export class InitAction implements Action {
   type = "init";
  //add an optional payload
  constructor(public payload: Array<NoteItem>) {
    
  } 
}

export class SetEmtyFilterAction implements Action {
  type = "emty";
 //add an optional payload
 constructor() {
   
 } 
}

export class BoxAction implements Action {
  type = "check box";
 //add an optional payload
 constructor(public payload: NoteItem) {
   
 } 
}

export class ItemAddAction implements Action {
  type = "Add";
 //add an optional payload
 constructor(public payload: NoteItem) {
   
 } 
}

export class ItemDelAction implements Action {
  type = "Delete";
 //add an optional payload
 constructor(public payload: NoteItem) {
   
 } 
}

export class ItemUpdateAction implements Action {
  type = "Update";
 //add an optional payload
 constructor(public payload: NoteItem) {
   
 } 
}

export class SearchByName implements Action {
  type = "Search";
 //add an optional payload
 constructor(public payload: String) {
   
 } 
}

export class UserAction implements Action {
  type = "User";
 //add an optional payload
 constructor(public payload: User) {
   
 } 
}

export class AppDeconnect implements Action {
  type = "Deconnect User";
 //add an optional payload
 constructor() {} 
}

/*
type NoteAddAction = ItemAddAction;
type NoteDelAction = ItemDelAction;
type NoteUpdateAction = ItemUpdateAction;

export { NoteAddAction, NoteDelAction, NoteUpdateAction }*/
