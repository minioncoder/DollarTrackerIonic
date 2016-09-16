import {LoadingController} from  'ionic-angular';
import {Injectable} from '@angular/core';

@Injectable()
export class LoadingService{
    public loading: any;
    constructor(private loadingCtrl:LoadingController) {
        this.loading = loadingCtrl.create();
    }
}