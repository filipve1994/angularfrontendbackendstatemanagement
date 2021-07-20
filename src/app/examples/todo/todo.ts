import {List, Record} from 'immutable';

const TodoRecord = Record({
  id: 0,
  description: "",
  completed: false
});

export class Todo extends TodoRecord {

  // @ts-ignore
  id: number | undefined;

  // @ts-ignore
  description: string | undefined;

  // @ts-ignore
  completed: boolean | undefined;

  constructor(props: Iterable<[string, unknown]> | Partial<{ id: number; description: string; completed: boolean; }> | undefined) {
    super(props);
  }

}
