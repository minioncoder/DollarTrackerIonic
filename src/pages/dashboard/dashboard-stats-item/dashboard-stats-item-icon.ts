import { Component, Input } from '@angular/core';
import {IconMapperService} from '../../../shared/iconmapper/iconmapper.service'

@Component({
    selector: 'dashboard-stats-item-icon',
    template: `<i *ngIf="expenseSubCategoryId" [ngClass]="iconMapper.mapper[expenseSubCategoryId]?iconMapper.mapper[expenseSubCategoryId] :'fa fa-list'" class="fa-2x"> &nbsp;</i>`
})
export class DashboardStatsItemIcon {
    @Input() expenseSubCategoryId;
    constructor(public iconMapper : IconMapperService) { }
}