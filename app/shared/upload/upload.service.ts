import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Rx'
import {JwtService} from '../jwt/jwt.service'
//http://stackoverflow.com/questions/35985347/how-to-upload-file-in-angular2
@Injectable()
export class UploadService {
    public progress;
    public progressObserver;
    constructor(private _jwtService:JwtService) { 
        this.progress = Observable.create( observer => {
            this.progressObserver = observer;
        }).share();
    }
public makeFileRequest (url: string, params: string[], files: File[]): Observable<any> {
    return Observable.create(observer => {
        let formData: FormData = new FormData(),
            xhr: XMLHttpRequest = new XMLHttpRequest();

        for (let i = 0; i < files.length; i++) {
            formData.append("FILE", files[i], files[i].name);
        }
        if(params.length >= 1) {
            formData.append("DTD", params[0]);
        }

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    observer.next(JSON.parse(xhr.response));
                    observer.complete();
                } else {
                    observer.error(xhr.response);
                }
            }
        };

        xhr.upload.onprogress = (event) => {
           
        };
        
        xhr.open('POST', url, true);
        xhr.setRequestHeader("Authorization", "Bearer "+this._jwtService.get())
        xhr.send(formData);
        return xhr.response;
    });
  }
}