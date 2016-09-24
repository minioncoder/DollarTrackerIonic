import { Component, Input, EventEmitter, Output } from '@angular/core';
import { ModalController, Platform, NavParams, ViewController } from 'ionic-angular';
import { InviteFriendModalPage } from './invite-friend.modal';
@Component({
    selector: 'invite-friend',
    template: `
        <button (click)="openModal()">
          <ion-icon name="add"></ion-icon>
        </button>
    `,
    directives:[InviteFriendModalPage]
})
export class InviteFriendPage {

    constructor(public modalCtrl: ModalController) { }

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