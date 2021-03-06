import { Component, OnInit } from '@angular/core';
import { ExpenseStory } from '../expenseStory/expenseStory.model';
import { ExpenseStoryService } from '../expenseStory/expenseStory.service';
import { ViewController, AlertController, LoadingController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Rx';

@Component({
    templateUrl: 'newExpenseReport.modal.html'
})
export class NewExpenseReportModalPage {
    public expenseStory: ExpenseStory;
    public loading: any;
    public editReport: boolean = false;
    constructor(private _expenseStoryService: ExpenseStoryService, public viewCtrl: ViewController, private alert: AlertController,
        private loadingCtrl: LoadingController, private params: NavParams) {
        this.expenseStory = new ExpenseStory();
        if (params.data && params.data.expenseStoryId) {
            this.expenseStory = params.data;
            console.log('Edit expense story', params.data);
            console.log(JSON.stringify(this.expenseStory));
            this.editReport = true;
        }
        else {
            let dt = new Date();
            this.expenseStory.startDt = dt.toISOString();
            var endDt = new Date();
            endDt.setDate(endDt.getDate() + 30);
            this.expenseStory.endDt = endDt.toISOString();
        }

    }
    public save() {
        const addFn =  this._expenseStoryService.addExpenseStory(this.expenseStory);
        const editFn = this._expenseStoryService.editExpenseStory(this.expenseStory);
        const loadingFn = () => {
            this.loading = this.loadingCtrl.create();
            this.loading.present();
        }
        Observable
        .of(this.expenseStory)
        .filter((x) => this.validate() && x != null)
        .do(x => loadingFn())
        .switchMap(()=> Observable.if(()=> this.editReport, editFn, addFn))
        .subscribe(response => {
              this.dismiss(response);
         })
    }
    public dismiss(response) {
        this.viewCtrl.dismiss(response);
        this.loading.dismiss();
    }

    private validate() {
        let isValid = false;
        if (this.expenseStory.title == null || this.expenseStory.title.trim().length <= 0 || this.expenseStory.title.trim().length > 100) {
            this.showError("Please a valid title for your expense report");
        }
        else if (this.expenseStory.startDt == null || this.expenseStory.startDt.trim().length <= 0) {
            this.showError("Please enter a valid start date");
        }
        else if (this.expenseStory.endDt == null || this.expenseStory.endDt.trim().length <= 0) {
            this.showError("Please enter a valid end date");
        }
        else { isValid = true; }
        return isValid;
    }
    public showError(message) {
        let errorAlert = this.alert.create({
            title: 'Invalid Input',
            message: message,
            buttons: ['OK'],
            enableBackdropDismiss: true
        });
        errorAlert.present();
    }
}