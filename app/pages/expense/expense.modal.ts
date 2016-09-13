import {Component} from '@angular/core';
import {LoadingController, NavController, ModalController, Platform, NavParams, ViewController, AlertController} from 'ionic-angular';
import {Expense} from './expense.model';
import {Camera} from 'ionic-native';
import {ExpenseService} from './expense.service';
import {ExpenseStory} from '../expenseStory/expenseStory.model';
import {Plugins} from '../../shared/upload/plugins.service';
import 'whatwg-fetch';
import {Transfer} from 'ionic-native';

@Component({
    templateUrl: 'build/pages/expense/expense.modal.html',
    providers: [ExpenseService]
})
export class ExpenseModalPage {
    private expenseStory: ExpenseStory;
    private expense: Expense = new Expense();
    private _imageBlob: any = null;
    images: Array<string> = [];
    loading: any;
    constructor(
        public platform: Platform,
        public params: NavParams,
        public viewCtrl: ViewController,
        private alertCtrl: AlertController,
        private expenseService: ExpenseService,
        private plugins: Plugins,
        private navCtrl: NavController,
        private loadingCtrl: LoadingController
    ) {
        let dt = new Date();
        this.expenseStory = params.data;
        this.expense.expenseUtcDt = dt.toISOString();
        this.expenseStory = params.data;
        this.expense.expenseStoryId = this.expenseStory.expenseStoryId;
        this.loading = loadingCtrl.create();
    }

    makeFileIntoBlob(_imagePath) {
        return fetch(_imagePath).then((_response) => {
            return _response.blob()
        }).then((_blob) => {
            return _blob;
        })
    }

    save() {
        var fileName = 'receipt-' + new Date().getTime() + '.jpg';
        console.log("images:", JSON.stringify(this.images));
        if (this.images.length > 0) {
            this.loading.present();
            let alert1 = this.alertCtrl.create({
                title: 'Adding expense now'
            });
            // alert1.present();
            //TODO: temporary solution
            if (!this.expense.expenseCategoryId) {
                this.expense.expenseCategoryId = 'HOMEEXPENSES';
            }
            if (!this.expense.expenseSubCategoryId) {
                this.expense.expenseSubCategoryId = 'CABLE';
            }
            var file = new File(this._imageBlob, fileName);
            var files: Array<any> = [file];
            this.expenseService
                .addExpense(this.expense, this.images)
                .subscribe((response) => {
                    this.dismiss();
                }, error => { this.dismiss(); }, () => { this.dismiss(); }); //TODO: display proper error message in case of failure
        }
    }

    uploadReceipt() {
        this.plugins.camera.open()
            .then(imgUrl => {
                console.log("image url:", imgUrl);
                this.images.push(imgUrl);
            }, error => { console.log("image upload error", error) })
    }

    dismiss() {
        this.viewCtrl.dismiss();
        this.loading.dismiss();
    }
}