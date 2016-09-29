import { Component, OnInit } from '@angular/core';
import {FriendsService} from '../friends/friends.service';
import {UserService} from '../../user/user.service';
import { ViewController, NavParams } from 'ionic-angular';
import {CollaboratorService} from './collaborator.service';

@Component({
    templateUrl: 'collaborator.modal.html',
    providers: [CollaboratorService]
})
export class CollaboratorModalPage {
    private connections=[];
    private items = [];
    private expenseStoryId = null;
    constructor(private friendsServive:FriendsService, private userService:UserService,public viewCtrl: ViewController, private collaboratorService: CollaboratorService, private params: NavParams) {
        this.expenseStoryId = params.data.expenseStoryId;
        this.friendsServive.getFriends(userService.user.userId)
        .subscribe(result =>{
            this.connections = result.data;
            this.items = result.data;
        })
     }

    add(userId) {
        if(userId) {
            this.collaboratorService.add(userId, this.expenseStoryId)
            .subscribe(result =>{
                this.dismiss(result);
            })
        }
    }
    getItems(ev: any) {
        // set val to the value of the searchbar
        let val = ev.target.value;
        this.connections = this.items;
        if (val && val.trim() != '') {
            this.connections = this.items.filter(item => item.email.toLowerCase().includes(val.toLowerCase()))
        }
    }
     dismiss(response) {
        this.viewCtrl.dismiss(response);
    }
}