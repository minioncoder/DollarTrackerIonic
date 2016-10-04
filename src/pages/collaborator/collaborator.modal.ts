import { Component, OnInit } from '@angular/core';
import {FriendsService} from '../friends/friends.service';
import {UserService} from '../../user/user.service';
import { ViewController, NavParams } from 'ionic-angular';
import {CollaboratorService} from './collaborator.service';

@Component({
    templateUrl: 'collaborator.modal.html'
})
export class CollaboratorModalPage {
    public connections=[];
    public items = [];
    public expenseStoryId = null;
    public queryText='';

    constructor(public friendsServive:FriendsService, public userService:UserService,public viewCtrl: ViewController,
     public collaboratorService: CollaboratorService, public params: NavParams) {
        this.expenseStoryId = params.data.expenseStoryId;
        this.friendsServive.getFriends(userService.user.userId)
        .subscribe(result =>{
            this.connections = result.data;
            this.items = result.data;
        })
     }

   public add(userId) {
        if(userId) {
            this.collaboratorService.add(userId, this.expenseStoryId)
            .subscribe(result =>{
                this.dismiss(result);
            })
        }
    }
  public getItems(ev: any) {
        // set val to the value of the searchbar
        let val = ev.target.value;
        this.connections = this.items;
        if (val && val.trim() != '') {
            this.connections = this.items.filter(item => item.email.toLowerCase().includes(val.toLowerCase()))
        }
    }
 public dismiss(response) {
        this.viewCtrl.dismiss(response);
    }
}