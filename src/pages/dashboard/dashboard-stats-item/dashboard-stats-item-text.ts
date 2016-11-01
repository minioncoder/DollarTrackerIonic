import { Component, Input } from '@angular/core';

@Component({
    selector: 'dashboard-stats-item-text',
    template: `<span *ngIf="recentlyAddedItem">
         You spent 
            <strong>\${{recentlyAddedItem.amount|number}}</strong> for <strong>{{recentlyAddedItem.categoryDescription}}</strong>  {{recentlyAddedItem.expenseDtUtc | date:"MMM"}}, {{recentlyAddedItem.expenseDtUtc | date:"dd"}}
        </span>`
})
export class DashboardStatsItemText {
    @Input() recentlyAddedItem;
    constructor() { }
}