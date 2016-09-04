import {Component} from '@angular/core';
import {ExpenseModalPage} from  './expense.modal';
import {ModalController, Platform, NavParams, ViewController} from 'ionic-angular';
@Component({
    selector: 'expense',
    template: `
    <ionic-buttons end>
      <ion-icon name="add" (click)="openModal()" secondary></ion-icon>
   </ionic-buttons>   
    `
})
export class ExpensePage {
    constructor(public modalCtrl: ModalController) { }

  openModal() {

    let modal = this.modalCtrl.create(ExpenseModalPage);
    modal.present();
  }
}