import { Component, OnInit, ViewChild } from '@angular/core';
import {ExpenseStoryService} from './expenseStory.service';
import {Observable} from 'rxjs/Rx';
import { NavParams } from 'ionic-angular';

//import {ExpenseService} from '../expense/expense.service';
import {Expense} from '../expense/expense.model';
import {IconMapperService} from '../../shared/iconmapper/iconmapper.service';
import {ExpenseStory, ExpenseStorySummary} from './expenseStory.model';
import {ExpensePage} from '../expense/expense';
@Component({
    templateUrl: 'build/pages/expenseStory/expenseStoryDetails.html',
    providers: [ExpenseStoryService],
    directives: [ExpensePage]
})
export class ExpenseStoryDetailsPage {
    private sub: any;
    private expensesByCategory;
    private expenseStorySummary: any;
    private categoryKeys = [];
    constructor(private _expenseStoryService: ExpenseStoryService, private _iconMapper: IconMapperService, public navParams: NavParams) {
        this.expenseStorySummary = navParams.data;
        //get expenseStorySummary TODO: need to optimize this call
        // this._expenseStoryService
        // .getExpenseStorySummary(id)
        // .subscribe(es =>{
        //     this.expenseStorySummary = es.data;
        // });
    }
    ionViewWillEnter() {
        this.loadExpenses();
    }
    private loadExpenses() {
        this._expenseStoryService
            .getAllExpensesByCategory(this.expenseStorySummary.expenseStory.expenseStoryId)
            .subscribe(es => {
                this.expensesByCategory = es.data;
                this.categoryKeys = Object.keys(es.data);
            });
    }
    onNotify(expense: Expense): void {
        if (expense) {
            this.loadExpenses();
        }
    }
}