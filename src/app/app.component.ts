import {Component, ViewChild} from '@angular/core';
import {Platform, Nav, AlertController} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import { TouchID } from '@ionic-native/touch-id';
import {LoginPage} from  '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';
import {TouchIdService} from '../shared/touch-id/touch-id.service';
import { UserService } from '../user/user.service';

@Component({
  template: `<ion-nav [root]="rootPage" swipeBackEnabled="false"></ion-nav>`
})
export class DollarTrackerApp {

  @ViewChild(Nav) nav: Nav;
  public rootPage: any;

  constructor(private platform: Platform, statusBar: StatusBar, private touchId: TouchID, private alert: AlertController, private touchIdService: TouchIdService, private user:UserService) {
    this.rootPage = LoginPage;

    this.user.init();
    this.user.isAuthenticated
    .subscribe(x=>{
      if(x) {
       this.rootPage = TabsPage;
      }
    })
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.overlaysWebView(false);
      statusBar.isVisible = false;
      touchId.isAvailable().
        then(x => {
          this.touchIdService.init(this.nav);
          this.touchIdService.attemptTouchId();
        });
    });
  }
}
