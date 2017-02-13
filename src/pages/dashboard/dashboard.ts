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
  public options:any;
  constructor(public navCtrl: NavController, public _dashboardService: DashboardService,
    public _iconMapper: IconMapperService) {
      this.doRefresh(null);
      this.options = {
  color: '#aaa',
  // This has to be the same size as the maximum width to
  // prevent clipping
  strokeWidth: 4,
  trailWidth: 1,
  easing: 'easeInOut',
  duration: 1400,
  text: {
    autoStyleContainer: false
  },
  from: { color: '#aaa', width: 1 },
  to: { color: '#333', width: 4 },
  // Set default step function for all animate calls
  step: function(state, circle) {
    circle.path.setAttribute('stroke', state.color);
    circle.path.setAttribute('stroke-width', state.width);

    var value = Math.round(circle.value() * 100);
    if (value === 0) {
      circle.setText('');
    } else {
      circle.setText(value);
    }

  }
}
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
