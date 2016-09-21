import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {DashboardService} from './dashboard.service';
import {IconMapperService} from '../../shared/iconmapper/iconmapper.service'
@Component({
  templateUrl: 'build/pages/dashboard/dashboard.html',
  providers: [DashboardService]
})
export class DashboardPage {
  public dashboardStats: any;
  private loading: any;
  constructor(private navCtrl: NavController, private _dashboardService: DashboardService,
    private _iconMapper: IconMapperService) {
  }
  ionViewWillEnter() {
    this._dashboardService.getDashboardStats()
      .subscribe(ds => {
        this.dashboardStats = ds.data;
      },
      e => { },
      () => { }
      );
  }
}
