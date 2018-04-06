declare var require;
const ProgressBar = require('progressbar.js');

import {Component, Input, ElementRef, ViewChild} from '@angular/core';


@Component({
  selector: 'progress-bar-circle',
  template: `
    <div id="container" #container style="width:50%; height:50%">
      
    </div>
`
})
export class ProgressBarCircleComponent {
  @Input() options: any;
  private shape: any;
 @ViewChild('container') container
  constructor(private elementRef: ElementRef) {
  }

  ngOnInit() {
    this.shape = new ProgressBar.Circle(this.container.nativeElement, this.options);
    this.shape.animate(1.0);
  }
}
 