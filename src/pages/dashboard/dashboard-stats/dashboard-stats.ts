import { Component, Input } from '@angular/core';

@Component({
    selector: 'dashboard-stats',
    templateUrl: 'dashboard-stats.html'
})
export class DashboardStats {
    @Input() recentlyAdded;
    constructor() { }
}