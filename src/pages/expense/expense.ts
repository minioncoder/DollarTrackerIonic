import {Component, Input, EventEmitter, Output} from '@angular/core';
import {ExpenseModalPage} from  './expense.modal';
import {ModalController, Platform, NavParams, ViewController} from 'ionic-angular';
import {Expense} from './expense.model';
import {ExpenseStory} from '../expenseStory/expenseStory.model'
@Component({
    selector: 'expense',
    template: `
      <button ion-button icon-only (click)="openModal()">
        <i class="fa fa-1x fa-plus"></i>
      </button>
    `
})
export class ExpensePage {
  @Input() expenseStory:ExpenseStory;
  @Input() expense:Expense = null;
  constructor(public modalCtrl: ModalController) { }

   @Output() notify: EventEmitter<Expense> = new EventEmitter<Expense>(); 
  openModal() {
    var self = this;
    let modal = this.modalCtrl.create(ExpenseModalPage, {expenseStory:this.expenseStory, expense:this.expense});
    modal.present();
    modal.onDidDismiss(function(response) {
      if(response && response.success) {
        self.notify.emit(<Expense>response.data);
      }
    })
  }
}