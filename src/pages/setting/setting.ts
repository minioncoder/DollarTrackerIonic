import {Component,ViewChild} from '@angular/core';
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
    private avatarUrl;
  @ViewChild(Nav) nav:Nav;
    
    constructor(private apiUrl: ApiUrl, private api: ApiService, 
    private userService:UserService, private navCtrl: NavController){
        this.avatarUrl = `${apiUrl.profilePicUrl}/${userService.user.userId}`;
    }

    logout(){
        this.userService.logout();
        this.navCtrl.pop();
        this.navCtrl.setRoot(LoginPage);
    }
}