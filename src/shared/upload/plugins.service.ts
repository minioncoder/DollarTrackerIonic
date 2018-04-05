import {Injectable} from "@angular/core";
import {Camera} from '@ionic-native/camera';
import {ImagePicker} from '@ionic-native/image-picker';
 

@Injectable()
export class Plugins {
    
    constructor(private _camera:Camera) { }     
    
    albums = {            
        open () : Promise<any>  { 
            return ImagePicker.getPlugin().getPictures({
                    quality: 50,                        
                    maximumImagesCount: 1,
            }).then((imgUrls) => {
                return imgUrls;
            }, (err) => {                                   
                if(err.error == "cordova_not_available") {               
                    alert("Cordova is not available, please make sure you have your app deployed on a simulator or device");                                   
                } else {                
                    console.log("Failed to open albums: " + err.error);
                }
            });
        },         
    }
    
    camera = {       
        open () : Promise<any>  {
            let options = {
                destinationType: 1,
                sourceType: 1,
                encodingType: 0,
                quality:50,
                allowEdit: false,
                saveToPhotoAlbum: false,            
                correctOrientation: true,
            };        
            return Camera.getPlugin().getPicture(options).then((imgUrl) => {
                console.log("In camera get picture",imgUrl);
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
}