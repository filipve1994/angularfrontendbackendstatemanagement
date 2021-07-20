import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampleTodoUiComponent } from './example-todo-ui.component';

describe('ExampleTodoUiComponent', () => {
  let component: ExampleTodoUiComponent;
  let fixture: ComponentFixture<ExampleTodoUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExampleTodoUiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExampleTodoUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
