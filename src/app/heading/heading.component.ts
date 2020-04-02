import { Component, OnInit, EventEmitter, Output } from '@angular/core';


@Component({
  selector: 'app-heading',
  templateUrl: './heading.component.html',
  styleUrls: ['./heading.component.scss']
})
export class HeadingComponent implements OnInit {
  @Output() linkEvent = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  onClickHref(feature: string) {
    return this.linkEvent.emit(feature);
  }

}
