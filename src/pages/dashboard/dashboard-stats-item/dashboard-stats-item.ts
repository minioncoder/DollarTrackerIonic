import { Component, Input } from '@angular/core';
@Component({
    selector: 'dashboard-stats-item',
    templateUrl: 'dashboard-stats-item.html'
})
export class DashboardStatsItem {
    @Input() recentlyAddedItem;
    constructor() { }
}