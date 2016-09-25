import { Injectable } from '@angular/core';
import {ApiUrl} from '../../shared/apiurl.service';
import {ApiService} from '../../shared/api/api.service';

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
}