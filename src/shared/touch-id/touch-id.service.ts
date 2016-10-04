import { Injectable } from '@angular/core';
import {AlertController, Nav, LoadingController} from 'ionic-angular';
import { SecureStorage, TouchID } from 'ionic-native';
import {UserService} from '../../user/user.service';
import {LoginService} from '../../pages/login/login.service';
import {TabsPage} from '../../pages/tabs/tabs';

@Injectable()
export class TouchIdService {
    private secureStorage: SecureStorage;
    private SecureStorageName = 'dollarTrackerSecureStorage';
    public touchIdAvailable = false;
    private nav: Nav = null;
    constructor(private userService: UserService, private alertCtrl: AlertController,
        private login: LoginService, private loadingCtrl: LoadingController) {
    }
    init(nav: Nav) {
        this.nav = nav;
        this.secureStorage = new SecureStorage();
        this.secureStorage.create(this.SecureStorageName)
            .then(
            x => {
                this.touchIdAvailable = true;
            },
            error => {
                console.log(error);
            }
            )

    }
    attemptTouchId() {
        this.secureStorage.get('dollarTrackerUser').then(
            (usr) => {
                this.touchIdAuthentication(usr);
            },
            (err) => {

            }
        );
    }
    enableTouchId(usr) {
        if(this.touchIdAvailable) {
        this.secureStorage.set('dollarTrackerUser', JSON.stringify(usr))
            .then(
            (data) => { }
            );
        }
    }
    touchIdAuthentication(usr) {
        if (usr && this.touchIdAvailable) {
            TouchID.verifyFingerprint('Authenticate to login to your Dollar Tracker account')
                .then(
                res => {
                    let loading = this.loadingCtrl.create();
                    loading.present();
                    this.login.login(JSON.parse(usr))
                        .subscribe(result => {
                            this.userService.add(result);
                            this.nav.push(TabsPage);
                            loading.dismiss();
                        });
                },
                err => console.error('Error', err)
                );
        }
    }
}