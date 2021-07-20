import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ExampleTodoUiComponent} from "./examples/example-todo-ui/example-todo-ui.component";

const routes: Routes = [
  {path: '1', component: ExampleTodoUiComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
