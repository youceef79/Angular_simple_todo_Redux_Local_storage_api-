import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class TodoService {
  
  static todoList : Map<any, any>;
  static count : number;
  static instance: TodoService;
  static username: string;

   constructor() {
      TodoService.count = 0;
      TodoService.todoList = new Map();
      TodoService.username = "";
  }

  static getInstance(){

    if(this.instance != null)
       return this.instance;

     this.instance = new TodoService(); 
     return this.instance;    
  }
  
  static addTolist(t: String, c: String, chck: boolean = false){
     var key: any[number] =  this.count;
     var title: any[string] =  t;
     var content: any[string] =  c;
     var checked: any[number] =  chck;
     console.log("checked : "+checked+", key :"+ key+ ", title :"+ title );
     this.todoList.set(key,{title, content, checked});
     console.log("\ntodolist : "+Object.getOwnPropertyNames(this.todoList));
     this.count++;
  }

  static updateOneTodo(k : number, t: String, c: String, chck: boolean){
   var key: any[number] =  k;  
   var title: any[string] =  t;
   var content: any[string] =  c;
   var checked: any[number] =  chck;
   this.todoList.forEach( (value,keyc,todoList) => {
      if(keyc == k){
        todoList.set(key,{title, content, checked});
      }
   }); 
 }

  static removeFromlist(key: number){
   this.todoList.forEach( (v,k,todoList) => {
      if(k == key){
          console.log("key : ", k);
          console.log("title : ", todoList.get(k)["title"]);
          todoList.delete(k);
      }
   }); 
    this.count--;
 }
  static getAll(){
      return this.todoList;
   }
  
   static  deleteAll(){
     this.todoList.forEach( (v,k,todoList) => {
        todoList.delete(k);
     }); 
  }
   static setName(name){
      this.username = name;
   }
}
