import {Component, ViewChild} from '@angular/core';
import {Platform, ionicBootstrap, Nav} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {TabsPage} from './pages/tabs/tabs';
import {LoginPage} from './pages/login/login'
import {LoginService} from './pages/login/login.service';
import {UserService} from './user/user.service';
import {ApiUrl} from './shared/apiurl.service';
import {ApiService} from './shared/api/api.service';
import {JwtService} from './shared/jwt/jwt.service';
import {DashboardPage} from './pages/dashboard/dashboard';
import {ExpenseReportPage} from './pages/expenseReport/expenseReport';
import {IconMapperService} from './shared/iconmapper/iconmapper.service';
import {UploadService} from './shared/upload/upload.service';
import {Plugins} from './shared/upload/plugins.service';
import {LoadingService} from './shared/loading/loading.service';
interface PageObj {
  title: string;
  component: any;
  icon: string;
  index?: number;
}

@Component({
  template: `
              <ion-menu id="loggedOutMenu" [content]="content">

  <ion-toolbar>
    <ion-title>Menu</ion-title>
  </ion-toolbar>

  <ion-content class="outer-content">

    <ion-list>
      <ion-list-header>
        Navigate
      </ion-list-header>
      <button ion-item menuClose *ngFor="let p of appPages" (click)="openPage(p)">
        <ion-icon item-left [name]="p.icon"></ion-icon>
        {{p.title}}
      </button>
    </ion-list>

    <ion-list>
      <ion-list-header>
        Account
      </ion-list-header>
      <button ion-item menuClose *ngFor="let p of loggedOutPages" (click)="openPage(p)">
        <ion-icon item-left [name]="p.icon"></ion-icon>
        {{p.title}}
      </button>
    </ion-list>
  </ion-content>

</ion-menu>
              <ion-nav [root]="rootPage" swipeBackEnabled="false"></ion-nav>
            `
          })
export class DollarTrackerApp {

  @ViewChild(Nav) nav:Nav;
  private rootPage: any;

  appPages: PageObj[] = [
    { title: 'Dashboard', component: TabsPage, icon: 'analytics' },
    { title: 'Reports', component: TabsPage, index: 1, icon: 'apps' }
  ];

  loggedInPages: PageObj[] = [
      {title: 'Dashboard', component:DashboardPage, icon:'analytics'},
      {title:'Reports', component:ExpenseReportPage, icon:'apps'}
  ]
   loggedOutPages: PageObj[] = [
    { title: 'Login', component: LoginPage, icon: 'log-in' }
    // { title: 'Signup', component: SignupPage, icon: 'person-add' }
  ];
  constructor(private platform: Platform) {
    this.rootPage = LoginPage;

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }
    openPage(page: PageObj) {
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
// Pass the main App component as the first argument
// Pass any providers for your app in the second argument
// Set any config for your app as the third argument, see the docs for
// more ways to configure your app:
// http://ionicframework.com/docs/v2/api/config/Config/
ionicBootstrap(DollarTrackerApp,[LoginService, UserService, ApiUrl, ApiService, JwtService, IconMapperService, UploadService, Plugins, LoadingService]);
