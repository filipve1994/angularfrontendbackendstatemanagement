import { Component, OnInit } from '@angular/core';
import {TodoStoreService} from "../state/todo-store.service";
import {Todo} from "../todo";

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {

  constructor(
    public todoStore: TodoStoreService
  ) {
  }

  onToggleTodo(todo: Todo) {
    this.todoStore.toggleTodo(todo);
  }

  delete(todo: Todo) {
    this.todoStore.deleteTodo(todo);
  }

}




