import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-header-navbar',
  templateUrl: './header-navbar.component.html',
  styleUrls: ['./header-navbar.component.scss']
})
export class HeaderNavbarComponent implements OnInit {

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

  _toggleSidebar() {
    const resizeEvent = window.document.createEvent('UIEvents');
    resizeEvent.initEvent('resize', true, false);
    window.dispatchEvent(resizeEvent);
    this.openedChange.emit(!this._opened);
  }

}
