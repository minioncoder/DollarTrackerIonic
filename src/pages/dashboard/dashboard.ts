import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {DashboardService} from './dashboard.service';
import {IconMapperService} from '../../shared/iconmapper/iconmapper.service'
@Component({
  templateUrl: 'dashboard.html'
})
export class DashboardPage {
  public dashboardStats: any;
  public loading: any;
  public segment:string = 'recent';
  constructor(public navCtrl: NavController, public _dashboardService: DashboardService,
    public _iconMapper: IconMapperService) {
      this.doRefresh(null);
  }
   doRefresh(refresher) {
      this._dashboardService.getDashboardStats()
      .subscribe(ds => {
        this.dashboardStats = ds.data;
        console.log(this.dashboardStats);
        if(refresher) {
          refresher.complete();
        }
      });
   }
}
