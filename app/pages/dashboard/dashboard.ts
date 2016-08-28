import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {DashboardService} from './dashboard.service';
@Component({
  templateUrl: 'build/pages/dashboard/dashboard.html',
  providers:[DashboardService]
})
export class DashboardPage {
  public dashboardStats:any;
  constructor(private navCtrl: NavController, private _dashboardService:DashboardService) {
  }
  ionViewWillEnter(){
    this._dashboardService.getDashboardStats()
            .subscribe(ds=>{
                 this.dashboardStats = ds.data;
        }, 
        e => {},
        ()=>{}
        );
    }
  }
