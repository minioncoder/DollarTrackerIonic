import {Component} from '@angular/core';
import {HomePage} from '../home/home';
import {DashboardPage} from '../dashboard/dashboard';
import {ExpenseReportPage} from '../expenseReport/expenseReport';
import {SettingPage} from '../setting/setting';
import {NotificationsPage} from '../notifications/notifications'
import {FriendsPage} from '../friends/friends';
import { NavParams } from 'ionic-angular';
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  public tab1Root: any = DashboardPage;
  public tab2Root: any = ExpenseReportPage;
  public settingTab: any = SettingPage;
  public notificationsTab: any = NotificationsPage;
  public friendsTab: any = FriendsPage;
  mySelectedIndex: number;

  constructor(navParams: NavParams) {
    this.mySelectedIndex = navParams.data.tabIndex || 0;
  }
}
