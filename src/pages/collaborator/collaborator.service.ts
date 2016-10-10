import { Injectable } from '@angular/core';
import {ApiUrl} from '../../shared/apiurl.service';
import {ApiService} from '../../shared/api/api.service';
import {Observable} from 'rxjs/Rx';
@Injectable()
export class CollaboratorService {

    constructor(private apiUrl:ApiUrl, private apiService:ApiService) { }

    add(userId, storyId) {
        var url = this.apiUrl.addCollaborator + "/" + userId + "/" + storyId;
        return this.apiService.post(url, null);
    }
    getAll(storyId) {
        var url = this.apiUrl.getAllCollaborators + "/" + storyId;
        return this.apiService.get(url);
    }

    getFriendsWhoAreNotCollaborators(storyId) {
         var url = this.apiUrl.getFriendsWhoAreNotCollaborators + "/" + storyId + "/0/20";
         return this.apiService.get(url);
    }
}