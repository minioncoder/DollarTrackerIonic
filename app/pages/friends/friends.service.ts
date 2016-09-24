import { Injectable } from '@angular/core';
import {ApiUrl} from '../../shared/apiurl.service';
import {ApiService} from '../../shared/api/api.service';

@Injectable()
export class FriendsService {
    constructor(private apiUrl:ApiUrl, private apiService:ApiService) { }
    getFriends(userId) {
        var url = this.apiUrl.friends + "/" + userId;
        return this.apiService.get(url);
    }
    getMyFriendInvitations() {
        return this.apiService.get(this.apiUrl.myFriendInvitations);
    }
    getNewConnections(){
        var url = this.apiUrl.newConnections +"/0/50";
        return this.apiService.get(url);
    }
    inviteFriend(userId) {
        var url = this.apiUrl.inviteFriend + "/" + userId;
        return this.apiService.post(url, null);
    }
}