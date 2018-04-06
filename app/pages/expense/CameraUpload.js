var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Camera } from 'ionic-native';
export var CameraUploadService = (function () {
    function CameraUploadService() {
    }
    CameraUploadService.prototype.takePicture = function () {
        var options = {
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: 1,
            encodingType: 0,
            quality: 50,
            allowEdit: false,
            saveToPhotoAlbum: false,
            correctOrientation: true,
        };
        return Camera.getPicture(options).then(function (imgUrl) {
            return imgUrl;
        }, function (err) {
            if (err.error == "cordova_not_available") {
                alert("Cordova is not available, please make sure you have your app deployed on a simulator or device");
            }
            else {
                console.log("Failed to open camera: " + err.error);
            }
        });
    };
    CameraUploadService = __decorate([
        Injectable(), 
        __metadata('design:paramtypes', [])
    ], CameraUploadService);
    return CameraUploadService;
}());
//# sourceMappingURL=CameraUpload.js.map