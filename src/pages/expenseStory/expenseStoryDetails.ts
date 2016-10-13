import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { ExpenseStoryService } from './expenseStory.service';
import { Observable } from 'rxjs/Rx';
import { ModalController, Platform, NavParams, ViewController, ActionSheetController, LoadingController } from 'ionic-angular';

//import {ExpenseService} from '../expense/expense.service';
import { Expense } from '../expense/expense.model';
import { IconMapperService } from '../../shared/iconmapper/iconmapper.service';
import { ExpenseStory, ExpenseStorySummary } from './expenseStory.model';
import { ExpensePage } from '../expense/expense';
import { ExpenseService } from '../expense/expense.service';
import { CollaboratorModalPage } from '../collaborator/collaborator.modal';
import { CollaboratorService } from '../collaborator/collaborator.service';
import { ExpenseModalPage } from '../expense/expense.modal';
import { ImageViewerModalPage } from './image-viewer-modal';

@Component({
    templateUrl: 'expenseStoryDetails.html',
})
export class ExpenseStoryDetailsPage {
    public expensesByCategory;
    public expenseStorySummary: any;
    public items;
    public sub: any;
    public categoryKeys = [];
    public itemKeys = [];
    public collaborators = [];
    public collaboratorById = {};
    public queryText = '';
    public selectOptionsActionSheet;
    public displayResult = "category";
    public expensesByWeekly;
    public expensesBySubCategory;
    public expensesByDate;
    public expensesByDateKeys;
    public expensesBySubCategoryKeys;
    private loading;

    @Output() notify: EventEmitter<boolean> = new EventEmitter<boolean>();
    constructor(public _expenseStoryService: ExpenseStoryService, public _iconMapper: IconMapperService,
        public navParams: NavParams, public modalCtrl: ModalController, public collaboratorService: CollaboratorService,
        public expenseService: ExpenseService, private actionSheetCtrl: ActionSheetController, private loadingCtrl: LoadingController) {
        this.expenseStorySummary = navParams.data;
        this.loadCollaborators();
        this.loadExpenses();
        this.selectOptionsActionSheet = this.actionSheetCtrl.create({
            title: 'Sort By',
            buttons: [
                {
                    text: 'Date',
                    handler: () => {
                        console.log('Archive clicked');
                        this.displayResult = "date";
                        this.buildExpensesByDate();
                    }
                },
                {
                    text: 'Category',
                    handler: () => {
                        this.displayResult = "category";
                     //   this.loadExpenses();
                    }
                },
                {
                    text: 'Name',
                    handler: () => {
                        this.displayResult = "name";
                        this.buildExpensesBySubCategory();
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
    }

    private loadCollaborators() {
        this.collaboratorService.getAll(this.expenseStorySummary.expenseStory.expenseStoryId)
            .subscribe(result => {
                this.collaborators = result.data;
                this.buildCollaboratorById();
            })
    }
    private buildCollaboratorById() {
        var len = this.collaborators.length;
        var collboratorsById = {};
        for (var i = 0; i < len; i++) {
            collboratorsById[this.collaborators[i].collaboratorId] = this.collaborators[i];
        }
        this.collaboratorById = collboratorsById;
    }
    private loadExpenses() {
        this._expenseStoryService
            .getAllExpensesByCategory(this.expenseStorySummary.expenseStory.expenseStoryId)
            .subscribe(es => {
                this.expensesByCategory = es.data;
                this.items = es.data;
                this.categoryKeys = Object.keys(es.data);
                this.itemKeys = Object.keys(es.data);
            });
    }
    doRefresh(refresher) {
        this._expenseStoryService
            .getAllExpensesByCategory(this.expenseStorySummary.expenseStory.expenseStoryId)
            .subscribe(es => {
                this.expensesByCategory = es.data;
                this.items = es.data;
                this.categoryKeys = Object.keys(es.data);
                this.itemKeys = Object.keys(es.data);
                refresher.complete();
            });
    }

    viewReceipt(expense) {
        let modal = this.modalCtrl.create(ImageViewerModalPage, expense);
        modal.present();
    }

    edit(expense) {
        var self = this;
        let modal = this.modalCtrl.create(ExpenseModalPage, { expenseStory: this.expenseStorySummary.expenseStory, expense: expense });
        modal.present();
        modal.onDidDismiss(function (response) {
            if (response && response.success) {
                //    self.notify.emit(<Expense>response.data);
                //self.updateExpenseSummary(expense.expenseCategoryId, expense);
            }
        })
    }
    onAddExpenseNotify(expense): void {
        if (expense) {
            this.updateExpenseSummaryOnAddExpense(expense.expenseCategoryId, expense);
            this.loadExpenses();
        }
    }

    getItems(ev: any) {

        // set val to the value of the searchbar
        let val = ev.target.value;
        this.expensesByCategory = this.items;
        this.categoryKeys = this.categoryKeys;
        // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {
            this.expensesByCategory = {};
            let val1 = val.toLowerCase();
            this.categoryKeys = [];
            for (let obj in this.items) {
                var exs = this.items[obj].expenses
                    .filter((e) =>
                        e.expenseSubCategoryId.toLowerCase().includes(val1));
                // || e.description.toLowerCase().includes(val1) 
                // || e.storeName.toLowerCase().includes(val1));
                if (exs && exs.length > 0) {
                    this.expensesByCategory[obj] = this.items[obj];
                    this.expensesByCategory[obj].expenses = exs;
                    this.categoryKeys.push(obj);
                }
            }
        }
    }

    addCollaborator() {
        var self = this;
        let modal = this.modalCtrl.create(CollaboratorModalPage, this.expenseStorySummary.expenseStory);
        modal.present();
        modal.onDidDismiss(function (response) {
            if (response && response.success) {
                self.loadCollaborators();
                self.notify.emit(response.data);
            }
        })
    }
    removeExpense(ck, es) {
        this.expenseService
            .deleteExpense(es.expenseId)
            .subscribe(result => {
                this.updateExpenseSummaryOnRemoveExpense(ck, es);
            })
    }

    private updateExpenseSummaryOnAddExpense(categoryId, expense) {
        this.expenseStorySummary.totalExpenses += expense.amount;
        this.expenseStorySummary.totalExpenseCount += 1;
    }

    private updateExpenseSummaryOnRemoveExpense(categoryId, expense) {
        var idx = this.expensesByCategory[categoryId].expenses.indexOf(expense);
        this.expensesByCategory[categoryId].total -= expense.amount;
        this.expenseStorySummary.totalExpenses -= expense.amount;
        this.expenseStorySummary.totalExpenseCount -= 1;
        this.expensesByCategory[categoryId].expenses.splice(idx, 1);
    }

    private buildExpensesByDate() {
        if (!this.expensesByDate) {
            this.loading = this.loadingCtrl.create();
            this.loading.present();
            this._expenseStoryService
                .getAllExpensesByDate(this.expenseStorySummary.expenseStory.expenseStoryId)
                .subscribe(es => {
                    this.loading.dismiss();
                    this.expensesByDate = es.data;
                    this.expensesByDateKeys = Object.keys(this.expensesByDate);
                });
        }
    }
    private buildExpensesBySubCategory() {
        if (!this.expensesBySubCategory) {
            this.loading = this.loadingCtrl.create();
            this.loading.present();
            this._expenseStoryService
                .getAllExpensesBySubCategory(this.expenseStorySummary.expenseStory.expenseStoryId)
                .subscribe(es => {
                    this.loading.dismiss();
                    this.expensesBySubCategory = es.data;
                    this.expensesBySubCategoryKeys = Object.keys(this.expensesBySubCategory);
                });
        }
    }
    presentSortFilters() {
        let actionSheet = this.actionSheetCtrl.create({
            title: 'Sort By',
            buttons: [
                {
                    text: 'Date',
                    handler: () => {
                        console.log('Archive clicked');
                        this.displayResult = "date";
                        this.buildExpensesByDate();
                    }
                },
                {
                    text: 'Category',
                    handler: () => {
                        this.displayResult = "category";
                        this.loadExpenses();
                    }
                },
                {
                    text: 'Sub Category',
                    handler: () => {
                        this.displayResult = "name";
                        this.buildExpensesBySubCategory();
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        actionSheet.present();
    }
}