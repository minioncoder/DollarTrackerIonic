import {Component, Input, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import {NavController, AlertController, LoadingController, App} from 'ionic-angular';
import {LoginService} from './login.service';
import {DashboardPage} from '../dashboard/dashboard';
import {UserService} from '../../user/user.service';
import {TabsPage} from '../tabs/tabs';
import {Observable} from 'rxjs/Rx';
import {TouchIdService} from '../../shared/touch-id/touch-id.service';
import {AccountPage} from '../account/account';
import {ForgotPasswordPage} from '../forgotPassword/forgotPassword';
@Component({
    templateUrl: 'login.html',
    selector: 'page-login'
})
export class LoginPage {
    public email: string = null;
    public password: string = null;
    public EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    public invalidEmailAlert;
    public invalidPasswordAlert;
    public loading: any;
    public touchIdAvailable = false;
    constructor(private navCtrl: NavController, private alert: AlertController, private _loginService: LoginService, private _userService: UserService,
        private loadingCtrl: LoadingController, public touchIdService:TouchIdService, private app:App) {

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
    
    public submit() {
        var isValid = this.validateEmailAndPassword();
        if (!isValid) {
            return;
        }
        var payload = { "email": this.email, "password": this.password };
        
        this.loading.present();
        this._loginService
            .login(payload)
            .subscribe(result => {
                this.loading.dismiss();
                if (!result.success) {
                    this.showLoginError(result.message);
                    return;
                }
                this.touchIdService.enableTouchId(payload);
                this._userService.add(result);
                this.navCtrl.push(TabsPage);
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
    private validateEmailAndPassword(): boolean {
        if (this.email == null || this.email == "" || !this.EMAIL_REGEXP.test(this.email)) {
            this.invalidEmailAlert.present();
            return false;
        }
        if (this.password == null || this.password == "") {
            this.invalidPasswordAlert.present();
            return false;
        }
        return true;
    }

    gotoCreateAccount() {
        this.app.getRootNav().setRoot(AccountPage);
    }
    gotoForgotPassword() {
        this.app.getRootNav().setRoot(ForgotPasswordPage);
    }
}
