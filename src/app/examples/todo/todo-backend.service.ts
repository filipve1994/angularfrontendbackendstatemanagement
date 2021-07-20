import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Todo} from "./todo";
import {Observable} from "rxjs";
import {List} from "immutable";

// @Injectable({ providedIn: 'root' })
@Injectable()
export class TodoBackendService {

  http: HttpClient

  constructor(http: HttpClient) {
    this.http = http;
  }

  getAllTodos() {
    return this.http.get('http://localhost:3000/todo');
    // return this.http.get('/todo');
  }

  saveTodo(newTodo: Todo): Observable<List<Todo>> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json; charset=utf-8');

    // return this.http.post<List<Todo>>('/todo', JSON.stringify(newTodo.toJS()), {headers});
    return this.http.post<List<Todo>>('http://localhost:3000/todo', JSON.stringify(newTodo.toJS()), {headers});
  }

  deleteTodo(deletedTodo: Todo) {
    let params = new HttpParams();
    // let params = new URLSearchParams();
    params.append('id', '' + deletedTodo.id);

    return this.http.delete('http://localhost:3000/todo', {params});
    // return this.http.delete('/todo', {params});
    // return this.http.delete('/todo', {search: params});
  }

  toggleTodo(toggled: Todo) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json; charset=utf-8');

    return this.http.put('http://localhost:3000/todo', JSON.stringify(toggled.toJS()), {headers});
    // return this.http.put('/todo', JSON.stringify(toggled.toJS()), {headers});

  }
}
