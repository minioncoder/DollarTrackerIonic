import { Component, OnInit } from '@angular/core';
import {FriendsService} from './friends.service';
import {ViewController} from 'ionic-angular';

@Component({
    templateUrl: 'build/pages/friends/invite-friend.modal.html'
})
export class InviteFriendModalPage {
    private friends = "search";
    private newConnections = [];
    constructor( public viewCtrl: ViewController, private friendsService:FriendsService) { 
        this.friendsService.getNewConnections()
        .subscribe(result=>{
            this.newConnections = result.data;
        })
    }
    inviteUser(userId){
        this.friendsService.inviteFriend(userId)
        .subscribe(x=>{
            console.log('You have successfully invited user')
        })
    }

    dismiss(response) {
        this.viewCtrl.dismiss(response);
    }
}