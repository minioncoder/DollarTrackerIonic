import { Injectable } from '@angular/core';
import {Observable, Subject, BehaviorSubject} from 'rxjs/Rx';
import {ApiService} from '../../shared/api/api.service';
import {ApiUrl} from '../../shared/apiurl.service'
declare var PUBNUB;

@Injectable()
export class PubnubService {
    pubnub:any;
    public isReady:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    constructor(private _apiUrl:ApiUrl, private _apiService:ApiService) {
        
        this._apiService.get(this._apiUrl.pubnubSubscribeKey)
            .take(1)
            .subscribe(subKey => {
            this.pubnub = PUBNUB.init({
                subscribe_key:subKey
            });
            this.isReady.next(true);
        })
     }

     public listen(channel:string): Observable<any>
     {
         return Observable.create(observer =>{
             this.pubnub.subscribe({
                 channel: channel,
                 restore: false,
                 message: (msg) =>{
                     observer.next(msg);
                 }
             })
              return ()=>{
                this.pubnub.unsubscribe({
                    channel: channel
                });
            };
         });
     }
}