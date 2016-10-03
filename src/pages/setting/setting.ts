import {Component,ViewChild} from '@angular/core';
import {App} from 'ionic-angular';
import {ApiUrl} from '../../shared/apiurl.service';
import {ApiService} from '../../shared/api/api.service';
import {UserService} from '../../user/user.service';
import {NavController,Nav} from  'ionic-angular';
import {LoginPage} from '../login/login';
import {TabsPage} from '../tabs/tabs';

@Component({
    templateUrl: 'setting.html'
})
export class SettingPage {
    public avatarUrl;
  @ViewChild(Nav) nav:Nav;
    
    constructor(public apiUrl: ApiUrl, public api: ApiService, public app:App 
    public userService:UserService, public navCtrl: NavController){
        this.avatarUrl = `${apiUrl.profilePicUrl}/${userService.user.userId}`;
    }

    logout(){
        this.userService.logout();
        this.app.getRootNav().setRoot(LoginPage);
        //this.nav.root = LoginPage;
      //  this.navCtrl.pop();
     // this.navCtrl.popToRoot();
    }
}