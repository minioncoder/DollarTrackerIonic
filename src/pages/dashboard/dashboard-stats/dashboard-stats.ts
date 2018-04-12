import { Component, Input } from '@angular/core';
import {IconMapperService} from '../../../shared/iconmapper/iconmapper.service'
@Component({
    selector: 'dashboard-stats',
    templateUrl: 'dashboard-stats.html'
})
export class DashboardStats {
    @Input() recentlyAdded;
    constructor(public iconMapper : IconMapperService) { }
}