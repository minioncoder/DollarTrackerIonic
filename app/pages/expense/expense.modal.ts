import {Component} from '@angular/core';
import {ModalController, Platform, NavParams, ViewController} from 'ionic-angular';

@Component({
    templateUrl: 'build/pages/expense/expense.modal.html'
})
export class ExpenseModalPage {
   constructor(
      public platform: Platform,
      public params: NavParams,
      public viewCtrl: ViewController
  ) { }

   dismiss() {
    this.viewCtrl.dismiss();
  }
}