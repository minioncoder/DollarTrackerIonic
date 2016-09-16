import { Component, OnInit } from '@angular/core';
import {ViewController} from 'ionic-angular';
import {ExpenseStoryService} from '../../pages/expenseStory/expenseStory.service';
import {ApiUrl} from '../apiurl.service';
import {ApiService} from '../api/api.service';

@Component({
    selector: 'ionic-select',
    templateUrl: 'build/shared/ionic-select/ionic-select.html',
    providers:[ExpenseStoryService]
})
export class IonicSelectPage{
    private expenseCategories = [];
    private items = [];
    constructor(public viewCtrl: ViewController, private _apiUrl:ApiUrl, private _apiService:ApiService) { 
        
    }
    ionViewWillEnter(){
        this.loadExpenseCategories();
    } 
   
    selected(expenseCategory:any) {
        console.log("YOU Have selected");
        console.log(JSON.stringify(expenseCategory))
        this.dismiss(expenseCategory);
    }
 getItems(ev: any) {
   
    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.expenseCategories = this.items.filter((item) => {
        return item.description.toLowerCase().includes(val.toLowerCase());
      });
    }
  }
    
     dismiss(data:any) {
        this.viewCtrl.dismiss(data);
    }
    //todo: move this code to service
     private loadExpenseCategories(){
        this._apiService
        .get(this._apiUrl.expenseCategory)
        .subscribe(ec=>{
            this.expenseCategories = ec;
            this.items = ec;
        })
    }
}