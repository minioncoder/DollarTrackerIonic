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
    private items;
    private categoryKeys = [];
    private itemKeys = [];
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
                this.items = es.data;
                this.categoryKeys = Object.keys(es.data);
                this.itemKeys = Object.keys(es.data);
            });
    }
    onNotify(expense: Expense): void {
        if (expense) {
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
            this.categoryKeys = [];
            for (let obj in this.items) {
                var exs = this.items[obj].expenses.filter((e) => e.expenseSubCategoryId.toLowerCase().includes(val.toLowerCase()))
                if (exs && exs.length > 0) {
                    this.expensesByCategory[obj] = this.items[obj];
                    this.expensesByCategory[obj].expenses = exs;
                    this.categoryKeys.push(obj);
                }
            }
        }
    }
}