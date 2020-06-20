import { Component, Input, Output, EventEmitter, OnDestroy } from '@angular/core';

@Component({
  selector: 'ar-dual-list',
  templateUrl: './dual-list.component.html',
  styleUrls: ['./dual-list.component.css']
})
export class DualListComponent implements OnDestroy {

  @Input()
  public source: any[];

  @Input()
  public destination: any[];

  @Output()
  public destinationChange: any = new EventEmitter<any[]>();

  constructor() { }

  public emitDestinationData(event): void {
    this.destinationChange.emit(event);
  }

  public ngOnDestroy(): void {
    this.destinationChange.complete();
  }

}
