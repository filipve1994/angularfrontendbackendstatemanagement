import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {initialUiState, UiState} from "./ui-state";

// @Injectable({ providedIn: 'root' })
@Injectable()
export class UiStateStoreService {

  private _uiState: BehaviorSubject<UiState> = new BehaviorSubject(initialUiState);

  constructor() {
  }

  get uiState() {
    return this._uiState.asObservable();
  }

  startBackendAction(message: string) {
    this._uiState.next({
      actionOngoing: true,
      message
    });
  }

  endBackendAction() {
    this._uiState.next({
      actionOngoing: false,
      message: "",
    })
  }
}
