import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-todo-header',
  templateUrl: './todo-header.component.html',
  styleUrls: ['./todo-header.component.scss']
})
export class TodoHeaderComponent {

  @Output() todo = new EventEmitter();

  constructor() {
  }

  addTodo(input: { value: string; }) {
    this.todo.emit(input.value);
    input.value = "";
  }
}


