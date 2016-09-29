import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import {Observable} from 'rxjs/Observable'
declare var escape: any;
@Injectable()
export class JwtService {
    private _jwtKey = "ionicDollarTrackerJwtToken";
    constructor(private _localStorage:Storage){
    }
    private data;
    public get():string {
        this._localStorage.get(this._jwtKey)
       .then(x=>{this.data = x;});
     
       return this.data;
     //   .then(x=>{data = x;});
      //  return data;
    }
    
    public set(token: string){
        console.log('SETTING JWT token', token);
        this._localStorage.set(this._jwtKey, token);
    }

    
public isAuthenticated():boolean{
   //this.get(); 
    let token = localStorage.getItem(this._jwtKey);
    console.log('jwt service isAuthenticated', token);
    if(!token) return false;
    let decoded = this.decodeToken(token)
    if(typeof decoded == "undefined" || decoded == null || typeof decoded.exp === "undefined") {
      return false;
    }
    return decoded.exp >= Math.round(new Date().getTime() / 1000);
}

public clear(){
    this._localStorage.remove(this._jwtKey);
}

private urlBase64Decode(str:string) {
    var output = str.replace(/-/g, '+').replace(/_/g, '/');
    switch (output.length % 4) {
      case 0: { break; }
      case 2: { output += '=='; break; }
      case 3: { output += '='; break; }
      default: {
        throw 'Illegal base64url string!';
      }
    }

    return decodeURIComponent(escape(window.atob(output))); //polifyll https://github.com/davidchambers/Base64.js
  }

  private decodeToken(token:string) {
    var parts = token.split('.');

    if (parts.length !== 3) {
      throw new Error('JWT must have 3 parts');
    }

    var decoded = this.urlBase64Decode(parts[1]);
    if (!decoded) {
      throw new Error('Cannot decode the token');
    }

    return JSON.parse(decoded);
  }
}