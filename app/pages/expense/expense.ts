import {Component, Input} from '@angular/core';
import {ExpenseModalPage} from  './expense.modal';
import {ModalController, Platform, NavParams, ViewController} from 'ionic-angular';
import {Expense} from './expense.model';
import {ExpenseStory} from '../expenseStory/expenseStory.model'
@Component({
    selector: 'expense',
    template: `
      <button (click)="openModal()">
        <i class="fa fa-1x fa-plus"></i>
      </button>
    `
})
export class ExpensePage {
  @Input() expenseStory:ExpenseStory;
  constructor(public modalCtrl: ModalController) { }


  openModal() {
   
    let modal = this.modalCtrl.create(ExpenseModalPage, this.expenseStory);
    modal.present();
  }
}