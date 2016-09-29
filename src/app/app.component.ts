import {Component, ViewChild} from '@angular/core';
import {Platform, Nav} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {LoginPage} from  '../pages/login/login';

interface PageObj {
  title: string;
  component: any;
  icon: string;
  index?: number;
}

@Component({
  template: `
              <ion-nav [root]="rootPage" swipeBackEnabled="false"></ion-nav>
            `
          })
export class DollarTrackerApp {

  @ViewChild(Nav) nav:Nav;
  private rootPage: any;

  constructor(private platform: Platform) {
    this.rootPage = LoginPage;

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }
    openPage(page) {
    // the nav component was found using @ViewChild(Nav)
    // reset the nav to remove previous pages and only have this page
    // we wouldn't want the back button to show in this scenario
    if (page.index) {
      this.nav.setRoot(page.component, {tabIndex: page.index});

    } else {
      this.nav.setRoot(page.component);
    }

    if (page.title === 'Logout') {
      // Give the menu time to close before changing to logged out
      setTimeout(() => {
      //  this.userData.logout();
      }, 1000);
    }
  }
}
