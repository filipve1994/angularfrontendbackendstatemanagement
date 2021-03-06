import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { TranslocoRootModule } from './transloco/transloco-root.module';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { AkitaNgRouterStoreModule } from '@datorama/akita-ng-router-store';
import { environment } from '../environments/environment';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { SidebarComponent } from './components/layout/sidebar/sidebar.component';
import { HeaderNavbarComponent } from './components/layout/header-navbar/header-navbar.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import {SidebarModule} from "primeng/sidebar";
import {AccordionModule} from "primeng/accordion";
import { TodoListComponent } from './examples/todo/todo-list/todo-list.component';
import { ExampleTodoUiComponent } from './examples/example-todo-ui/example-todo-ui.component';
import { TodoFooterComponent } from './examples/example-todo-ui/todo-footer/todo-footer.component';
import { TodoHeaderComponent } from './examples/example-todo-ui/todo-header/todo-header.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HeaderNavbarComponent,
    FooterComponent,
    TodoListComponent,
    ExampleTodoUiComponent,
    TodoFooterComponent,
    TodoHeaderComponent
  ],
  imports: [
    //Angular modules
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,

    // framework modules


    // icon modules
    FontAwesomeModule,

    // multilanguage modules
    TranslocoRootModule,

    //State management modules
    environment.production ? [] : AkitaNgDevtools.forRoot(),
    AkitaNgRouterStoreModule,
    SidebarModule,
    AccordionModule,


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
