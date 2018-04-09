import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {FriendsService} from './friends.service';
import {UserService} from '../../user/user.service';
import {InviteFriendPage} from './invite-friend';
import {ApiUrl} from '../../shared/apiurl.service';
import { InviteFriendModalPage } from './invite-friend.modal';
import { ModalController } from 'ionic-angular';
@Component({
    templateUrl: 'friends.html'
})
export class FriendsPage {
    public friends = "invitations";
    public invitations = [];
    public connections = [];
    public avatarUrl = null;
    constructor(public friendsService:FriendsService, public userService:UserService, private apiUrl:ApiUrl, public modalCtrl: ModalController) {
          this.loadMyConnections();
          this.loadMyFriendInvitations();
          this.avatarUrl = `${apiUrl.profilePicUrl}/${userService.user.userId}`;
    }
     private loadMyConnections(){
         this.friendsService.getFriends(this.userService.user.userId)
        .subscribe(result =>{
            this.connections = result.data;
        })
     }
     private loadMyFriendInvitations() {
        this.friendsService.getMyFriendInvitations()
        .subscribe(result => {
            this.invitations = result.data;
        })
     }
     acceptFriendInvitation(userId) {
         this.friendsService.acceptFriendInvitation(userId)
         .subscribe(result =>{
             this.loadMyConnections();
             this.loadMyFriendInvitations();
         })
     }
     declineFriendInvitation(userId) {
         this.friendsService.declineFriendInvitation(userId)
         .subscribe(result =>{
             this.loadMyFriendInvitations();
         })
     }
     @Output() notify: EventEmitter<boolean> = new EventEmitter<boolean>();
     openModal() {
         var self = this;
         let modal = this.modalCtrl.create(InviteFriendModalPage);
         modal.present();
         modal.onDidDismiss(function (response) {
             if (response && response.success) {
                 self.notify.emit(response.data);
             }
         })
     }
}