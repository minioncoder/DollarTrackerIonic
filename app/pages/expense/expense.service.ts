import { Injectable } from '@angular/core';
import {ApiUrl} from '../../shared/apiurl.service';
import {ApiService} from '../../shared/api/api.service';
import {Observable} from 'rxjs/Rx'
import {UploadService} from '../../shared/upload/upload.service';
import {Transfer} from 'ionic-native';
import {JwtService} from '../../shared/jwt/jwt.service';
@Injectable()
export class ExpenseService {

    constructor(private _apiurl: ApiUrl, private _apiService: ApiService, private _uploadService: UploadService,
        private _jwtService: JwtService) { }

    addOnlyExpense(payload: any): Observable<any> {
        return this._apiService.post(this._apiurl.addOnlyExpense, payload)
    }
    addExpense(payload, files: Array<any>): Observable<any> {
        return this.upload(files[0], payload);
    }
    updateOnlyExpense(payload: any): Observable<any> {
        return this._apiService.post(this._apiurl.updateOnlyExpense, payload)
    }

    updateExpense(payload, files: Array<any>): Observable<any> {
        return this._uploadService
            .makeFileRequest(this._apiurl.updateExpense, [JSON.stringify(payload)], files);
    }

    deleteExpense(expenseId) {
        var url = this._apiurl.deleteExpense + "/" + expenseId;
        return this._apiService.delete(url);
    }

    upload = (image: string, payload): Observable<any> => {
        let ft = new Transfer();
        let filename = 'receipt-' + new Date().getTime() + ".jpg";
        let options = {
            fileKey: 'FILE',
            fileName: filename,
            mimeType: 'image/jpeg',
            chunkedMode: false,
            headers: {
                'Content-Type': undefined,
                'Authorization': 'Bearer ' + this._jwtService.get()
            },
            params: { 'DTD': JSON.stringify(payload) }
        };
        //ft.onProgress(this.onProgress);
        return Observable.fromPromise(ft.upload(image, this._apiurl.addExpense, options, false));

    }
}