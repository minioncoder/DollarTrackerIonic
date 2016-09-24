import { Component, OnInit } from '@angular/core';
import {FriendsService} from './friends.service';
import {UserService} from '../../user/user.service';
import {InviteFriendPage} from './invite-friend';
@Component({
    templateUrl: 'build/pages/friends/friends.html',
    directives: [InviteFriendPage]
})
export class FriendsPage {
    private friends = "invitations";
    private invitations = [];
    private connections = [];
    constructor(private friendsService:FriendsService, private userService:UserService) {
        this.friendsService.getFriends(this.userService.user.userId)
        .subscribe(result =>{
            this.connections = result.data;
        })

        this.friendsService.getMyFriendInvitations()
        .subscribe(result => {
            this.invitations = result.data;
        })
     }
}