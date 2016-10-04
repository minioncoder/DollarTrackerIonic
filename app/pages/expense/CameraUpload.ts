import {Injectable} from '@angular/core';
import {Camera} from 'ionic-native';

@Injectable()
export class CameraUploadService {
    constructor() { }
    takePicture(): Promise<any>  {
            let options = {
                destinationType: Camera.DestinationType.FILE_URI,
                sourceType: 1,
                encodingType: 0,
                quality:50,
                allowEdit: false,
                saveToPhotoAlbum: false,            
                correctOrientation: true,
            };        
            return Camera.getPicture(options).then((imgUrl) => {
                return imgUrl;
            }, (err) => {                
                if(err.error == "cordova_not_available") {
                    alert("Cordova is not available, please make sure you have your app deployed on a simulator or device");            
                } else {
                    console.log("Failed to open camera: " + err.error);                
                }    
            });
        } 
}