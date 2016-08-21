import {Component} from '@angular/core';
import {HomePage} from '../home/home';
import {DashboardPage} from '../dashboard/dashboard';
import {ExpenseReportPage} from '../expenseReport/expenseReport';
import {LoginPage} from '../login/login.component';
@Component({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {

  private tab1Root: any;
  private tab2Root: any;
  private tab3Root: any;

  constructor() {
    this.tab1Root = LoginPage;
    this.tab2Root = DashboardPage;
    this.tab3Root = ExpenseReportPage;
  }
}
