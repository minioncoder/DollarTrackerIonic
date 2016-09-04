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
    providers:[ExpenseStoryService],
    directives:[ExpensePage]
})
export class ExpenseStoryDetailsPage {
    private sub: any;
    private expensesByCategory;
    private expenseStorySummary:any;
    private categoryKeys =[];
    constructor( private _expenseStoryService:ExpenseStoryService, private _iconMapper:IconMapperService, public navParams: NavParams) {
        
            this.expenseStorySummary = navParams.data;
            
            this._expenseStoryService
            .getAllExpensesByCategory(this.expenseStorySummary.expenseStory.expenseStoryId)
            .subscribe(es => {
                this.expensesByCategory = es.data;
                this.categoryKeys = Object.keys(es.data);
            });

            //get expenseStorySummary TODO: need to optimize this call
            // this._expenseStoryService
            // .getExpenseStorySummary(id)
            // .subscribe(es =>{
            //     this.expenseStorySummary = es.data;
            // });
     }

    onNotify(expense:Expense):void {
        let exl = this.expensesByCategory[expense.expenseCategoryId.toLowerCase()];
        if(exl){
            var idx = exl.indexOf(expense);
            this.expensesByCategory[expense.expenseCategoryId.toLowerCase()].splice(idx,1);
        }
    }
}