import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'expense-report-item',
    templateUrl: 'expense-report-item.html',
    inputs: ['es']
})
export class ExpenseReportItem {
    constructor() { }
}