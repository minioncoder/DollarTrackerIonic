import {Component, Input} from '@angular/core';
import {ExpenseModalPage} from  './expense.modal';
import {ModalController, Platform, NavParams, ViewController} from 'ionic-angular';
import {Expense} from './expense.model';
import {ExpenseStory} from '../expenseStory/expenseStory.model'
@Component({
    selector: 'expense',
    template: `
    <ionic-buttons end>
      <i class="fa fa-2x fa-plus" (click)="openModal()"></i>
   </ionic-buttons>   
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