import { Component, OnInit } from '@angular/core';
import {NavController, LoadingController, ModalController, Platform, NavParams, ViewController, AlertController} from 'ionic-angular';
import {ApiUrl} from '../../shared/apiurl.service';
@Component({
    templateUrl: 'image-viewer-modal.html'
})
export class ImageViewerModalPage {
    public receipt;
    constructor( public params: NavParams, public viewCtrl: ViewController, public apiUrl:ApiUrl) {
        this.receipt = apiUrl.downloadReceipt + "/" + params.data.expenseStoryId + "/" +params.data.receiptId;
     }
     dismiss(){
         this.viewCtrl.dismiss();
     }
}