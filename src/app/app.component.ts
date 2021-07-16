import {Component, OnInit} from '@angular/core';
import {PrimeNGConfig} from "primeng/api";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'sampleakitaproject';

  // public _opened = true;
  public _opened = false;

  counter(i: number) {
    return new Array(i);
  }

  constructor(private primengConfig: PrimeNGConfig) {
  }

  ngOnInit() {
    this.primengConfig.ripple = true;
  }

  _toggleSidebarParent(opened: boolean) {

    const resizeEvent = window.document.createEvent('UIEvents');
    resizeEvent.initEvent('resize', true, false);
    window.dispatchEvent(resizeEvent);
    this._opened = opened;
  }


}

