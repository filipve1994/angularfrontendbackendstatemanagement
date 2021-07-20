import {Component, OnInit} from '@angular/core';
import {map} from 'rxjs/operators';
import {TodoStoreService} from "../todo/state/todo-store.service";
import {UiStateStoreService} from "../todo/state/ui-state-store.service";
import {Todo} from "../todo/todo";
import {List} from "immutable";
import {UiState} from "../todo/state/ui-state";

@Component({
  selector: 'app-example-todo-ui',
  templateUrl: './example-todo-ui.component.html',
  styleUrls: ['./example-todo-ui.component.scss']
})
export class ExampleTodoUiComponent {

  constructor(
    public todoStore: TodoStoreService,
    public uiStateStore: UiStateStoreService
  ) {
  }

  get size() {
    // return this.todoStore.todos.map((todos: List<Todo>) => todos.size);
    // return this.todoStore.todos.pipe(map((todos: List<Todo>) => todos.size));
    return this.todoStore.todos.subscribe();
  }

  get uiStateMessage() {
    return this.uiStateStore.uiState.pipe(map((uiState: UiState) => uiState.message));
  }

  onAddTodo(description: any) {
    let newTodo = new Todo({id: Math.random(), description});
    this.uiStateStore.startBackendAction('Saving Todo...');

    this.todoStore.addTodo(newTodo)
      .subscribe(
        res => {
        },
        err => {
          this.uiStateStore.endBackendAction();
        }
      )
  }
}


