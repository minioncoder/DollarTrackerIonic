import { Component, OnInit } from '@angular/core';
import { NotificationsService } from './notifications.service'
import { NotificationLog } from './notifications.model'
@Component({
    templateUrl: 'notifications.html'
})
export class NotificationsPage {
    public queryText = '';
    constructor(public notificationsService: NotificationsService) {
    }
    ionViewWillEnter() {
        this.notificationsService.readMessage(null);
    }
    doRefresh(refresher) {
        this.notificationsService.readMessage(refresher);
    }
}