import { Component, Output, EventEmitter } from '@angular/core';
import { IonicSelectPage} from './ionic-select';
import {ModalController} from 'ionic-angular';
import {IconMapperService} from '../iconmapper/iconmapper.service';
@Component({
    selector: 'ionic-search-select',
    template: `
        <ion-item>
            <i [ngClass] ="categoryIcon" item-left></i>
            <ion-input placeholder="Select category" [(ngModel)] = "expenseCategory.description" (click)="openModal()"></ion-input>
        </ion-item>
    `,
    directives: [IonicSelectPage]
})
export class IonicSearchSelectPage {

    private description = null;
    private categoryIcon = 'fa fa-list';
    private expenseCategory = {
        description : null,
        expenseCategoryId: null,
        expenseSubCategoryId: null
    }
    constructor(public modalCtrl: ModalController, private iconMapper:IconMapperService) { }
    @Output() notify: EventEmitter<any> = new EventEmitter<any>();
    openModal() {
        let modal = this.modalCtrl.create(IonicSelectPage);
        let self = this;
        modal.onDidDismiss(function (data) {
            if(data) {
              self.expenseCategory = data;
              if(self.expenseCategory.expenseSubCategoryId && self.iconMapper.mapper[self.expenseCategory.expenseSubCategoryId]) {
                  self.categoryIcon = self.iconMapper.mapper[self.expenseCategory.expenseSubCategoryId];
              }
              self.notify.emit(data);
            }
        });
        modal.present();
    }
}