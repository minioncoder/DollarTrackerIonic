import { Component, OnInit } from '@angular/core';
import {App, AlertController } from 'ionic-angular';
import { Http, Response } from '@angular/http';
import { ApiUrl } from '../../shared/apiurl.service'
import {ApiService} from '../../shared/api/api.service';
import {LoginPage} from '../login/login';
@Component({
    templateUrl: 'forgotPassword.html'
})
export class ForgotPasswordPage {
    public email: string;
    private EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    constructor(private app: App, private alert: AlertController, private http: Http, private apiUrl: ApiUrl, private api: ApiService) { }
    public submit() {
        if (!this.email || this.email.trim().length == 0 || !this.EMAIL_REGEXP.test(this.email)) {
            let emailErrorAlert = this.alert.create({
                title: 'Invalid Input',
                message: 'Please enter a valid email',
                buttons: ['OK'],
                enableBackdropDismiss: true
            });
            emailErrorAlert.present();
            return;
        }
        var url = this.apiUrl.forgotPassword; 
        let payload = {"email": this.email};
        this.api.post(url, payload)
            .subscribe(x => {
                let successAlert = this.alert.create({
                    title: 'Forgot Password',
                    message: 'An email is sent to the above email. Please follow the instructions to reset the password',
                    buttons: ['OK'],
                    enableBackdropDismiss: true
                })
                successAlert.present();
            });
    }

    gotoLogin() {
        this.app.getRootNav().setRoot(LoginPage);
    }
}