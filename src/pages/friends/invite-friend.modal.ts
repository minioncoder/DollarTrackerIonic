import { Component, OnInit } from '@angular/core';
import { FriendsService } from './friends.service';
import { ViewController } from 'ionic-angular';

@Component({
    templateUrl: 'invite-friend.modal.html'
})
export class InviteFriendModalPage {
    public friends = "search";
    public newConnections = [];
    public items = [];
    public queryText = '';
    constructor(public viewCtrl: ViewController, public friendsService: FriendsService) {
        this.friendsService.getNewConnections()
            .subscribe(result => {
                this.newConnections = result.data;
                this.items = result.data;
            })
    }
    public inviteUser(userId) {
        this.friendsService.inviteFriend(userId)
            .subscribe(x => {
                console.log('You have successfully invited user')
            })
    }

    public getItems(ev: any) {
        // set val to the value of the searchbar
        let val = ev.target.value;
        this.newConnections = this.items;
        if (val && val.trim() != '') {
            this.newConnections = this.items.filter(item => item.email.toLowerCase().includes(val.toLowerCase()))
        }
    }
    public dismiss(response) {
        this.viewCtrl.dismiss(response);
    }
}