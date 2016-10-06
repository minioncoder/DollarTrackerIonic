import {Component} from '@angular/core';
import {NavController, LoadingController, ModalController, Platform, NavParams, ViewController, AlertController} from 'ionic-angular';
import {Expense} from './expense.model';
import {Camera} from 'ionic-native';
import {ExpenseService} from './expense.service';
import {ExpenseStory} from '../expenseStory/expenseStory.model';
import {Plugins} from '../../shared/upload/plugins.service';
import {Transfer} from 'ionic-native';
import {IonicSearchSelectPage} from '../../shared/ionic-select/ionic-search-select';
import {ActionSheetController} from 'ionic-angular';

@Component({
    templateUrl: 'expense.modal.html'
})
export class ExpenseModalPage {
    public expenseStory: ExpenseStory;
    public expense: Expense = new Expense();
    public _imageBlob: any = null;
    public images: Array<string> = [];
    public loading: any;
    public base64Image: string = null;
    constructor(
        public platform: Platform,
        public params: NavParams,
        public viewCtrl: ViewController,
        public alert: AlertController,
        public expenseService: ExpenseService,
        public plugins: Plugins,
        public navCtrl: NavController,
        public loadingCtrl: LoadingController,
        public actionSheetCtrl: ActionSheetController
    ) {
        let dt = new Date();
        this.expenseStory = params.data.expenseStory;
        this.expense.expenseUtcDt = dt.toISOString();

        if (params.data.expense) {
            this.expense = params.data.expense;
        }
        else {
            this.expense.expenseStoryId = this.expenseStory.expenseStoryId;
        }
        this.loading = loadingCtrl.create();
    }
    public save() {
        if (!this.validate()) return;
        var fn;
        if (this.images.length > 0) {
            var fileName = 'receipt-' + new Date().getTime() + '.jpg';
            this.loading.present();

            var file = new File(this._imageBlob, fileName);
            var files: Array<any> = [file];
            fn = this.expenseService
                .addExpense(this.expense, this.images);
        }
        else {
            fn = this.expenseService.addOnlyExpense(this.expense)
        }
        if (fn) {
            fn.subscribe((response) => {
                this.dismiss(response);
            }, error => {
                this.dismiss(null);
            }, () => { this.dismiss(null); }); //TODO: display proper error message in case of failure
        }
    }

    public validate(): boolean {
        let isValid = false;
        if (this.expense.expenseSubCategoryId == null) {
            this.showError("Please select a valid expense category");
        }
        else if (this.expense.amount == null || this.expense.amount <= 0) {
            this.showError("Please enter a valid amount");
        }
        else if (this.expense.expenseUtcDt == null) {
            this.showError("Please select a valid expense date");
        }
        else {
            isValid = true;
        }
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

    public uploadReceipt() {

        let actionSheet = this.actionSheetCtrl.create({
            title: 'Upload receipt',
            buttons: [
                {
                    text: 'Take Photo',
                    handler: () => {
                        this.plugins.camera.open()
                            .then(imgUrl => {
                                if (imgUrl) {
                                    this.images.push(imgUrl);
                                    this.base64Image = imgUrl;
                                }
                            }, error => { console.log("image upload error", error) })
                    }
                },
                {
                    text: 'Photo Library',
                    handler: () => {
                        this.plugins.albums.open()
                            .then(imgUrl => {
                                if (imgUrl) {
                                    this.images.push(imgUrl);
                                    this.base64Image = imgUrl;
                                }
                            }, error => { console.log("image upload error", error) })
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
    public onSelectCategory(category: any) {
        if (category) {
            this.expense.expenseCategoryId = category.expenseCategoryId;
            this.expense.expenseSubCategoryId = category.expenseSubCategoryId;
            this.expense.subCategoryDescription = category.description;
        }
    }
    public dismiss(response) {
        this.viewCtrl.dismiss(response);
        this.loading.dismiss();
    }
}