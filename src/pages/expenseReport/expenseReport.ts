import {Component} from '@angular/core';
import {ExpenseStoryService} from '../expenseStory/expenseStory.service';
import { AlertController, App, ItemSliding, List, ModalController, NavController } from 'ionic-angular';
import {ExpenseStoryDetailsPage} from '../expenseStory/expenseStoryDetails';
import {ApiService} from '../../shared/api/api.service';
import {ApiUrl} from '../../shared/apiurl.service';
import {NewExpenseReportModalPage} from './newExpenseReport.modal';
@Component({
  templateUrl: 'expenseReport.html'
})
export class ExpenseReportPage {
  public queryText='';
  constructor(private alertCtrl: AlertController, private navCtrl: NavController, public _expenseStoryService:ExpenseStoryService,
   private apiService:ApiService, private _apiUrl:ApiUrl, public modalCtrl: ModalController) {
  }
  ionViewWillEnter() {
     this._expenseStoryService.loadExpenseStorySummaries(false);
  }
  doRefresh(refresher) {
    //todo: change this
    var url = this._apiUrl.report+"?active="+false;
        this.apiService
        .get(url)
        .subscribe((rs) => {
          refresher.complete();
            this._expenseStoryService.expenseStorySummaries.next(rs.data.expenseStorySummaries);
        })
  }
  goToDetails(es:any) {
    this.navCtrl.push(ExpenseStoryDetailsPage, es);
  }
  removeReport(slidingItem: ItemSliding, es, title) {
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
            // close the sliding item and hide the option buttons
           this._expenseStoryService.deleteExpenseStory(es.expenseStoryId);
           slidingItem.close();
          }
        }
      ]
    });
    // now present the alert on top of all other content
    alert.present();
  }

  addReport() {
    let reportModal = this.modalCtrl.create(NewExpenseReportModalPage);
    reportModal.present();
     reportModal.onDidDismiss(function(response) {
      if(response && response.success) {
         this._expenseStoryService.loadExpenseStorySummaries(false);
      }
    })
  }
  editReport(es) {
  let reportModal = this.modalCtrl.create(NewExpenseReportModalPage, es);
    reportModal.present();
     reportModal.onDidDismiss(function(response) {
      if(response && response.success) {
         this._expenseStoryService.loadExpenseStorySummaries(false);
      }
    })
  }
}
