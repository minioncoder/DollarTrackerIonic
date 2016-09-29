import { Component, OnInit } from '@angular/core';
import {NotificationsService} from './notifications.service'
import {NotificationLog} from './notifications.model'
@Component({
    templateUrl: 'notifications.html'
})
export class NotificationsPage {
    constructor(private notificationsService: NotificationsService) {
        notificationsService.readMessage();
 }
}