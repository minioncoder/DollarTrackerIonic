import {Component} from '@angular/core';
import {NavController, LoadingController, ModalController, Platform, NavParams, ViewController, AlertController} from 'ionic-angular';
import {Expense} from './expense.model';
import {Camera} from 'ionic-native';
import {ExpenseService} from './expense.service';
import {ExpenseStory} from '../expenseStory/expenseStory.model';
import {Plugins} from '../../shared/upload/plugins.service';
import {Transfer} from 'ionic-native';
import {IonicSearchSelectPage} from '../../shared/ionic-select/ionic-search-select';

@Component({
    templateUrl: 'build/pages/expense/expense.modal.html',
    providers: [ExpenseService],
    directives:[IonicSearchSelectPage]
})
export class ExpenseModalPage {
    private expenseStory: ExpenseStory;
    private expense: Expense = new Expense();
    private _imageBlob: any = null;
    images: Array<string> = [];
    loading:any;
    base64Image:string = null;
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
    save() {
        var fileName = 'receipt-' + new Date().getTime() + '.jpg';
        if (this.images.length > 0) {
            this.loading.present();
           
            var file = new File(this._imageBlob, fileName);
            var files: Array<any> = [file];
            this.expenseService
                .addExpense(this.expense, this.images)
                .subscribe((response) => {
                    this.dismiss();
                }, error => {
                    console.log("--got error---");
                    console.log(error); 
                    this.dismiss(); 
                }, () => { this.dismiss(); }); //TODO: display proper error message in case of failure
        }
    }

    uploadReceipt() {
        this.plugins.camera.open()
            .then(imgUrl => {
                console.log("image url:", imgUrl);
                this.images.push(imgUrl);
                this.base64Image = imgUrl;
            }, error => { console.log("image upload error", error) })
    }
    onSelectCategory(category:any) {
        console.log("onSelectCategory");
        console.log(category);
        if(category) {
            this.expense.expenseCategoryId = category.expenseCategoryId;
            this.expense.expenseSubCategoryId = category.expenseSubCategoryId;
            this.expense.subCategoryDescription = category.description;
        }
    }
    dismiss() {
        this.viewCtrl.dismiss();
        this.loading.dismiss();
    }
}