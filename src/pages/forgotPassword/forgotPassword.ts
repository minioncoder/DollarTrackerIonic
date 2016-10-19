import { Component, OnInit } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { Http, Response } from '@angular/http';
import { ApiUrl } from '../../shared/apiurl.service'
@Component({
    templateUrl: 'forgotPassword.html'
})
export class ForgotPasswordPage {
    public email: string;
    private EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    constructor(private alert: AlertController, private http: Http, private apiUrl: ApiUrl) { }
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
        var url = this.apiUrl.forgotPassword +  encodeURI(this.email);
        this.http.post(url,null)
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
}