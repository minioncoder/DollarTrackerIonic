import {Component} from '@angular/core';
import {HomePage} from '../home/home';
import {DashboardPage} from '../dashboard/dashboard';
import {ExpenseReportPage} from '../expenseReport/expenseReport';
import { NavParams } from 'ionic-angular';
@Component({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {

  private tab1Root: any = DashboardPage;
  private tab2Root: any = ExpenseReportPage;

  mySelectedIndex: number;

  constructor(navParams: NavParams) {
    this.mySelectedIndex = navParams.data.tabIndex || 0;
  }
}
