import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable'
import {ApiUrl} from '../../shared/apiurl.service'
import {Headers, RequestOptions} from '@angular/http';
import {ILoginResponse} from '../../shared/models/loginResponse'

@Injectable()
export class LoginService {
    
    constructor(private _apiUrl:ApiUrl, private _http:Http) { }
    login(payload): Observable<ILoginResponse> {
        let body = JSON.stringify(payload);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        
     return this._http.post(this._apiUrl.loginUrl,body, options)
        .map((response: Response) => <ILoginResponse>response.json())
        .catch(this.handleError)
    }
     private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}