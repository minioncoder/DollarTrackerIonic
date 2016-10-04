import { Component, OnInit } from '@angular/core';
import {FriendsService} from './friends.service';
import {UserService} from '../../user/user.service';
import {InviteFriendPage} from './invite-friend';
@Component({
    templateUrl: 'friends.html'
})
export class FriendsPage {
    public friends = "invitations";
    public invitations = [];
    public connections = [];
    constructor(public friendsService:FriendsService, public userService:UserService) {
          this.loadMyConnections();
          this.loadMyFriendInvitations();
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
}