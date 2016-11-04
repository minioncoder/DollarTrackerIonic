import { Component, Input } from '@angular/core';
import {IconMapperService} from '../../../shared/iconmapper/iconmapper.service'

@Component({
    selector: 'dashboard-stats-item-icon',
    template: `<span style="padding:1x">
                    <i *ngIf="expenseSubCategoryId" [ngClass]="iconMapper.mapper[expenseSubCategoryId]?iconMapper.mapper[expenseSubCategoryId] :'fa fa-list'" class="fa-2x"> &nbsp;</i>
              </span>
              `
})
export class DashboardStatsItemIcon {
    @Input() expenseSubCategoryId;
    constructor(public iconMapper : IconMapperService) { }
}