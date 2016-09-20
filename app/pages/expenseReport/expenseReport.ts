import {Component} from '@angular/core';
import {ExpenseStoryService} from '../expenseStory/expenseStory.service';
import { AlertController, App, ItemSliding, List, ModalController, NavController } from 'ionic-angular';
import {ExpenseStoryDetailsPage} from '../expenseStory/expenseStoryDetails';
@Component({
  templateUrl: 'build/pages/expenseReport/expenseReport.html',
  providers: [ExpenseStoryService]
})
export class ExpenseReportPage {
  constructor(private alertCtrl: AlertController, private navCtrl: NavController, private _expenseStoryService:ExpenseStoryService) {
  }
  ionViewWillEnter() {
     this._expenseStoryService.loadExpenseStorySummaries(false);
  }
  goToDetails(es:any) {
    console.log("in go to details");
    this.navCtrl.push(ExpenseStoryDetailsPage, es);
  }
  removeReport(slidingItem: ItemSliding, sessionData, title) {
    let alert = this.alertCtrl.create({
      title: title,
      message: 'Are you sure you want to delete this expense report? You would loose all the associated expenses to this report.',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            // they clicked the cancel button, do not remove the session
            // close the sliding item and hide the option buttons
            slidingItem.close();
          }
        },
        {
          text: 'Remove',
          handler: () => {
            // they want to remove this session from their favorites
            // this.user.removeFavorite(sessionData.name);
            // this.updateSchedule();

            // close the sliding item and hide the option buttons
            slidingItem.close();
          }
        }
      ]
    });
    // now present the alert on top of all other content
    alert.present();
  }
}
