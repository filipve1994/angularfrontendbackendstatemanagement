import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

// https://stackblitz.com/edit/angular-playground-mnw29c?file=app%2Fapp.component.html
// https://stackoverflow.com/questions/56944139/how-to-configure-primeng-sidebar-to-leave-space-for-the-header-and-able-to-push
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  visibleSidebar1: any = true;

  // isExpanding = false;
  isExpanding = true;

  @Input() _opened: boolean | undefined;

  @Output() openedChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  toggleSideBar() {
    this.isExpanding = !this.isExpanding;

    this.openedChange.emit(!this._opened);
  }


}
