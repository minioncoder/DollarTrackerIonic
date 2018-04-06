import { Component, Output, EventEmitter, Input } from '@angular/core';
import { IonicSelectPage } from './ionic-select';
import { ModalController } from 'ionic-angular';
import { IconMapperService } from '../iconmapper/iconmapper.service';
import { ExpenseStoryService } from '../../pages/expenseStory/expenseStory.service';

@Component({
    selector: 'ionic-search-select',
    template: `
        <ion-item>
            <i [ngClass] ="categoryIcon" item-left></i>
            <ion-input placeholder="Select category" [(ngModel)] = "expenseCategory.description" readonly (focus)="openModal()"></ion-input>
        </ion-item>
    `
})
export class IonicSearchSelectPage {
    @Input('expense') expense;
    public description = null;
    public categoryIcon = 'fa fa-list';
    public expenseCategories = [];

    public expenseCategory = {
        description: null,
        expenseCategoryId: null,
        expenseSubCategoryId: null
    }
    constructor(public modalCtrl: ModalController, public iconMapper: IconMapperService, private expenseStoryService:ExpenseStoryService) {
    }
    ngOnInit() {
        if (this.expense && this.expense.expenseSubCategoryId) {
            this.expenseCategory.description = this.expenseStoryService.expenseCategoryById[this.expense.expenseSubCategoryId].description;
            this.expenseCategory.expenseCategoryId = this.expense.expenseCategoryId;
            this.expenseCategory.expenseSubCategoryId = this.expense.expenseSubCategoryId;
            if (this.expense.expenseSubCategoryId && this.iconMapper.mapper[this.expense.expenseSubCategoryId]) {
                this.categoryIcon = this.iconMapper.mapper[this.expense.expenseSubCategoryId];
            }
        }
    }
    @Output() notify: EventEmitter<any> = new EventEmitter<any>();
    openModal() {
        let modal = this.modalCtrl.create(IonicSelectPage);
        let self = this;
        modal.onDidDismiss(function (data) {
            if (data) {
                self.expenseCategory = data;
                if (self.expenseCategory.expenseSubCategoryId && self.iconMapper.mapper[self.expenseCategory.expenseSubCategoryId]) {
                    self.categoryIcon = self.iconMapper.mapper[self.expenseCategory.expenseSubCategoryId];
                }
                self.notify.emit(data);
            }
        });
        modal.present();
    }
}