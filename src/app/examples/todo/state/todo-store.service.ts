import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Todo} from "../todo";
import {List} from "immutable";
import {TodoBackendService} from "../todo-backend.service";
import {map, tap} from "rxjs/operators";

// @Injectable({ providedIn: 'root' })
@Injectable()
export class TodoStoreService {

  // @ts-ignore
  private _todos: BehaviorSubject<List<Todo>> = new BehaviorSubject(List([]));

  constructor(
    private todoBackendService: TodoBackendService
  ) {
    this.loadInitialData();
  }

  get todos() {
    return this._todos.asObservable();
  }

  loadInitialData() {
    // return this.todoBackendService.getAllTodos().pipe(
    //   tap((data: any) => {
    //
    //     this._todos.next(data);
    //   }),
    // );

    this.todoBackendService.getAllTodos()
      .subscribe(
        (res: Object) => {
          console.log(`res is : ${res}`)
          console.log(`res is : ${JSON.stringify(res)}`);

          // let todos = new Todo({
          //   id: res.id,
          //   description: res.description,
          //   completed: res.completed
          // })
        },
        err => console.log("error")
      )
    // .pipe(
    //   tap((todo: any) => {
    //     const todoNew = new Todo({
    //       id: todo.id,
    //       description: todo.description,
    //       completed: todo.completed
    //     });
    //
    //   })
    // )

    // return this.todoBackendService.getAllTodos.pipe(map((todos: List<Todo>) => todos.size));

  }

  addTodo(newTodo: Todo): Observable<any> {
    let obs = this.todoBackendService.saveTodo(newTodo);

    obs.subscribe(
      res => {
        this._todos.next(this._todos.getValue().push(newTodo));
      }
    );

    return obs;
  }

  toggleTodo(toggled: Todo): Observable<any> {
    let obs: Observable<any> = this.todoBackendService.toggleTodo(toggled);

    obs.subscribe(
      res => {
        let todos = this._todos.getValue();
        let index = todos.findIndex((todo: Todo) => todo.id === toggled.id);
        // let todo: Todo = todos.get(index);
        let todo = todos.get(index);
        this._todos.next(todos.set(index, new Todo({
          id: toggled.id,
          description: toggled.description,
          completed: !toggled.completed
        })));
      }
    );

    return obs;
  }


  deleteTodo(deleted: Todo): Observable<any> {
    let obs: Observable<any> = this.todoBackendService.deleteTodo(deleted);

    obs.subscribe(
      res => {
        let todos: List<Todo> = this._todos.getValue();
        let index = todos.findIndex((todo: Todo) => todo.id === deleted.id);
        this._todos.next(todos.delete(index));

      }
    );

    return obs;
  }
}
