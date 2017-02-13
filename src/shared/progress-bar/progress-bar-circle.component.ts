declare var require;
const ProgressBar = require('progressbar.js');

import {Component, Input, ElementRef} from '@angular/core';

import {ShapeOptions} from './progress-bar';

@Component({
  selector: 'progress-bar-circle',
  template: `
    <ng-content style="width:100px; height:100px"></ng-content>
`
})
export class ProgressBarCircleComponent {
  @Input() options: ShapeOptions;
  private shape: any;

  constructor(private elementRef: ElementRef) {
  }

  ngOnInit() {
    this.shape = new ProgressBar.Circle(this.elementRef.nativeElement, this.options);
    this.shape.animate(1.0);
  }
}
 