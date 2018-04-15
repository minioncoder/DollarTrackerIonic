import {Component} from '@angular/core';
import {App, AlertController, LoadingController} from 'ionic-angular';
import {LoginPage} from '../login/login';
import {Account} from './account.model';
import {ApiUrl} from '../../shared/apiurl.service';
import {ApiService} from '../../shared/api/api.service';
@Component({
    templateUrl: 'account.html'
})
export class AccountPage {

    public EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    public account: Account = new Account();
    private invalidEmailAlert;
    private invalidPasswordAlert;
    private loading: any;

    constructor(private app: App, private alert: AlertController, private api: ApiService,
        private apiUrl: ApiUrl, private loadingCtrl: LoadingController) {
        this.loading = loadingCtrl.create();
        this.invalidEmailAlert = this.alert.create({
            title: 'Invalid Input',
            message: 'Please enter a valid email',
            buttons: ['OK'],
            enableBackdropDismiss: true
        });

        this.invalidPasswordAlert = this.alert.create({
            title: 'Invalid Input',
            message: 'Please enter a password',
            buttons: ['OK'],
            enableBackdropDismiss: true
        });
    }

    gotoLogin() {
        this.app.getRootNav().setRoot(LoginPage);
    }
    submit() {
        if (!this.validateInput()) {
            return;
        }
        this.account.rePassword = this.account.password;
        this.loading.present();
        this.api
            .post(this.apiUrl.register, this.account)
            .subscribe(result => {
                this.loading.dismiss();
                if (!result.success) {
                    this.showLoginError(result.message);
                    return;
                }
                let successAlert = this.alert.create({
                    title: 'Success Created Account',
                    message: 'Please login now',
                    buttons: [{
                       text: 'OK',
                       handler: d=>{ this.gotoLogin(); }
                    }
                    ],
                    enableBackdropDismiss: true,
                });
                this.account = new Account();
                successAlert.present();
            },
            error => {
                this.loading.dismiss();
                console.log(error);
                this.showLoginError(error);
            });
    }
    private showLoginError(message) {
        let loginErrorAlert = this.alert.create({
            title: 'Invalid Input',
            message: message,
            buttons: ['OK'],
            enableBackdropDismiss: true
        });
        loginErrorAlert.present();
    }
    validateInput(): boolean {
        if (this.account.email == null || this.account.email == "" || !this.EMAIL_REGEXP.test(this.account.email)) {
            this.invalidEmailAlert.present();
            return false;
        }
        if (this.account.password == null || this.account.password.trim() == ""
            || this.account.password.trim().length < 8) {
            this.invalidPasswordAlert.present();
            return false;
        }
        return true;
    }
}