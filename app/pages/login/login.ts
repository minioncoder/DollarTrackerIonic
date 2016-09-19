import {Component, Input} from '@angular/core';
import {NavController, AlertController,LoadingController} from 'ionic-angular';
import {LoginService} from './login.service';
import {DashboardPage} from '../dashboard/dashboard';
import {UserService} from '../../user/user.service';
import {TabsPage} from '../tabs/tabs';
@Component({
    templateUrl: 'build/pages/login/login.html'
})
export class LoginPage {
    email: string = 'jsrao15@gmail.com';
    password: string = 'a';
    private EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    private invalidEmailAlert;
    private invalidPasswordAlert;
    private loading: any;
    constructor(private navCtrl: NavController, private alert: AlertController, private _loginService: LoginService, private _userService: UserService,
        private loadingCtrl: LoadingController) {
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

    // onPageWillEnter() {
    //   if(this._userService.isUserAuthenticated()) {
    //     this.navCtrl.push(TabsPage);
    //   }  
    // }
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
                console.log("LOGIN success", result);
                this.navCtrl.push(TabsPage);
                this._userService.add(result);
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
}
