import { Component, OnInit } from '@angular/core';
import {NavController, LoadingController, ModalController, Platform, NavParams, ViewController, AlertController} from 'ionic-angular';
import {ApiUrl} from '../../shared/apiurl.service';
@Component({
    templateUrl: 'build/pages/expenseStory/image-viewer-modal.html'
})
export class ImageViewerModalPage {
    private receipt;
    constructor( public params: NavParams, public viewCtrl: ViewController, private apiUrl:ApiUrl) {
        this.receipt = apiUrl.downloadReceipt + "/" + params.data.expenseStoryId + "/" +params.data.receiptId;
     }
     dismiss(){
         this.viewCtrl.dismiss();
     }
}