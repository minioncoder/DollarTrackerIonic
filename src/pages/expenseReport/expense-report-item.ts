import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'expense-report-item',
    templateUrl: 'expense-report-item.html'
})
export class ExpenseReportItem {
    @Input() es;
    constructor() { }
}