declare var require;
const ProgressBar = require('progressbar.js');

import {Component, Input, ElementRef} from '@angular/core';


@Component({
  selector: 'progress-bar-circle',
  template: `
    <ng-content style="width:100px; height:100px"></ng-content>
`
})
export class ProgressBarCircleComponent {
  @Input() options: any;
  private shape: any;

  constructor(private elementRef: ElementRef) {
  }

  ngOnInit() {
    this.shape = new ProgressBar.Circle(this.elementRef.nativeElement, this.options);
    this.shape.animate(1.0);
  }
}
 