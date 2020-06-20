import { Component, Input, ViewChild, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { MatSidenav } from '@angular/material';

import { Role } from 'src/common/models/user.model';

const SMALL_WIDTH_BREAKPOINT = 720;

@Component({
  selector: 'ar-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  @ViewChild(MatSidenav, {static: true})
  public sidenav: MatSidenav;

  @Input()
  public contentToolbarHeading = 'Airline Services';

  @Input()
  public role: Role;

  @Input()
  public sideNaveList: any = [];

  @Output()
  public iconEvent: EventEmitter<any> = new EventEmitter<any>();

  private mediaMatcher: MediaQueryList =
  matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`);

  constructor(private router: Router) {}

  public ngOnInit(): void {
    this.router.events.subscribe(() => {
      if (this.isScreenSmall()) {
        this.sidenav.close();
      }
    });
  }

  public isScreenSmall(): boolean {
    return this.mediaMatcher.matches;
  }

  public iconEmit(item: any): void {
    this.iconEvent.emit( { name: item.name,
                            icon: item.icon });
  }

}
