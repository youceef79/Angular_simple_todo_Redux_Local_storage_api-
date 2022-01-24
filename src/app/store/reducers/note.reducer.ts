import { NoteItem } from '../models/noteItem.model';
import { AppDeconnect, BoxAction, InitAction, ItemAddAction, SearchByName, SetEmtyFilterAction, UserAction } from '../actions/note.action';
import { ItemDelAction }  from '../actions/note.action';
import { ItemUpdateAction }  from '../actions/note.action';
import { Action } from '@ngrx/store';
import { User } from '../models/user.model';

//create a dummy initial state
const initialState: Array<NoteItem> = []; 
const defaultUser: User = { username: ""};   

export function NoteReducer (
  state: Array<NoteItem> = initialState,
  action: Action
) {
   if(action instanceof ItemAddAction){
    return [...state, (action as ItemAddAction).payload];
   }

   if(action instanceof ItemDelAction) {
     state = state.filter((s) => s != (action as ItemDelAction).payload);
     return state;
   }

   if(action instanceof BoxAction) {
    state.forEach(s => {
      if(s.id == (action as BoxAction).payload.id){
        s.isDone = (action as BoxAction).payload.isDone;
        console.log("note : "+ s.isDone);       
      } else {
         s = s;
      }
    });
    return state;
  }

   if(action instanceof ItemUpdateAction) {
     state.forEach(s => {
      if(s.id == (action as ItemUpdateAction).payload.id){
        s.name = (action as ItemUpdateAction).payload.name;
        s.content = (action as ItemUpdateAction).payload.content;
      } else {
         s = s;
      }
    }); 
    return state;
   }

   if(action instanceof AppDeconnect) {
    state = [];       
    return state;
   }
   return state;
}

export function UserReducer (
  userState: User = defaultUser,
  action: Action
) {
  if(action instanceof UserAction) {
    userState = {username: ""};
    userState.username = (action as UserAction).payload.username;
    return userState;
   }
   if(action instanceof AppDeconnect) {
        userState = null;
        console.log("user : ", userState);        
        return userState;
   }
   return userState;
}

export function NoteFilterReducer(state: Array<NoteItem>,
   action: Action){
   
    if(action instanceof InitAction) {
      state = (action as InitAction).payload;        
      return state;
    }

    if(action instanceof SetEmtyFilterAction) {
      state = [];        
      return state;
    }

    if(action instanceof SearchByName) {
      var search = (action as SearchByName).payload;
      var rgxp = new RegExp(search.toString(),"gi");
      var filteredState = state.filter((s) => { 
        return s.name.match(rgxp);
      });
      console.log("this : "+ search.toString());
      return filteredState;
     }

     return state;
}

/*
import { ActionReducer, INIT, UPDATE } from "@ngrx/store";
import { RootState } from "..";

export const hydrationMetaReducer = (
  reducer: ActionReducer<RootState>
): ActionReducer<RootState> => {
  return (state, action) => {
    if (action.type === INIT || action.type === UPDATE) {
      const storageValue = localStorage.getItem("state");
      if (storageValue) {
        try {
          return JSON.parse(storageValue);
        } catch {
          localStorage.removeItem("state");
        }
      }
    }
    const nextState = reducer(state, action);
    localStorage.setItem("state", JSON.stringify(nextState));
    return nextState;
  };
};
*/

