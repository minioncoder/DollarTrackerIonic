import {Component} from '@angular/core';
import {ModalController, Platform, NavParams, ViewController} from 'ionic-angular';
import {Expense} from './expense.model';
import {Camera} from 'ionic-native'
@Component({
    templateUrl: 'build/pages/expense/expense.modal.html'
})
export class ExpenseModalPage {
  private _expense: Expense = new Expense();
    
   constructor(
      public platform: Platform,
      public params: NavParams,
      public viewCtrl: ViewController
  ) {
       let dt = new Date();
    this._expense.expenseUtcDt =  dt.toISOString();
   }

   uploadReceipt() {
       Camera.getPicture({
           destinationType: Camera.DestinationType.FILE_URI
       })
   }
   dismiss() {
    this.viewCtrl.dismiss();
  }
}