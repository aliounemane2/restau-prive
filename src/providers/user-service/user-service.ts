import { Injectable } from '@angular/core';
import { Http,Response,Headers,RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { Camera } from '@ionic-native/camera';
import {StorageUtils} from '../../Utils/storage.utils';
import { Storage } from '@ionic/storage';

const CONTENT_TYPE_HEADER:string = 'Content-Type';
const APPLICATION_JSON:string = 'application/json';
const authorization:string = 'authorization';
const HTTP_AUTHORIZATION:string = 'HTTP_AUTHORIZATION';
//const BACKEND_URL:string = 'http://aims.avanquest.com/restau-prive/web/app_dev.php/';
const BACKEND_URL:string = 'http://213.246.59.111/restau-priv/web/app_dev.php/';
const options = new RequestOptions({
      headers: new Headers({
        'Accept': 'application/json',
        'Authorization': 'Bearer ' +StorageUtils.getToken()
      })
    });

/*
  Generated class for the UserServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UserServiceProvider {
  base64Image:any;
  token :any;
  tokenValidation : any;

  constructor(public http: Http, public camera:Camera,public storage: Storage) {
    console.log('Hello UserServiceProvider Provider');
    this.token = StorageUtils.getToken();
    /*this.storage.get('tokenValidation').then((val) => {
      console.log('Your name is', val);
      this.tokenValidation = val;
    })*/
  }

  createAuthorizationHeader(headers: Headers) {
    headers.append('Authorization', 'Bearer ' +StorageUtils.getToken()); 
  }

  getLink(){
    let link:Array<any> = BACKEND_URL.split('web');
    return link[0]+'web/';
  }


  dologin(username:string,password:string,rememberMe:boolean){
  
    let headers = new Headers();
    //headers.append(CONTENT_TYPE_HEADER, APPLICATION_JSON);
    return this.http.get(BACKEND_URL+"api/login?password="+password+"&username="+username).map((res:Response) => {
        let user:any = res.json();
        console.log(user);
        return user;
    });
  }

  tableauDeBord(){

    
  	return this.http.get(BACKEND_URL+'api/profil/tableau?type=mobile', options).map((res:Response) => {

  	    let user:any = res.json();
  	    console.log(res.headers.values());
  	    console.log(user);
  	    return user;
  	});
  }


  editUser(nom,prenom,username,email,anniversaire,telephone,password){
    let headers = new Headers();
    //headers.append(CONTENT_TYPE_HEADER, APPLICATION_JSON);
    console.log(BACKEND_URL+'api/edituser?type=mobile&nom='+nom+'&prenom='+prenom+'&username='+username+'&telephone='+telephone+'&email='+email+'&anniversaire='+anniversaire+'&password='+password);
    return this.http.get(BACKEND_URL+'api/edituser?type=mobile&nom='+nom+'&prenom='+prenom+'&username='+username+'&telephone='+telephone+'&email='+email+'&anniversaire='+anniversaire+'&password='+password, options).map((res:Response) => {

        let user:any = res.json();
        
        console.log(user);
        return user;
    });
  }

  createUser(nom,prenom,telephone,password,username,email,myDate){
    let headers = new Headers();
    //headers.append(CONTENT_TYPE_HEADER, APPLICATION_JSON);
    console.log(BACKEND_URL+'api/register?type=mobile&nom='+nom+'&prenom='+prenom+'&username='+username+'&telephone='+telephone+'&email='+email+'&datenaiss='+myDate+'&password='+password);
    return this.http.get(BACKEND_URL+'api/register?type=mobile&nom='+nom+'&prenom='+prenom+'&username='+username+'&telephone='+telephone+'&email='+email+'&datenaiss='+myDate+'&password='+password).map((res:Response) => {

        let user:any = res.json();
        
        console.log(user);
        return user;
    });
  }

  requestPhoneNumer(telephone,option){
    
    console.log(BACKEND_URL+'api/phonenubmer?type=mobile&telephone='+telephone);
    return this.http.get(BACKEND_URL+'api/phonenubmer?type=mobile&telephone='+telephone, option).map((res:Response) => {

        let user:any = res.json();
        
        console.log(user);
        return user;
    });
  }
  validateCode(code,option){
    console.log(BACKEND_URL+'api/phonenubmer/validate?type=mobile&code='+code);
    return this.http.get(BACKEND_URL+'api/phonenumber/validate?type=mobile&code='+code, option)
    .map((res:Response) => {

        let user:any = res.json();
        
        console.log(user);
        return user;
    });

  }
  

  resendCode(option){
    console.log(BACKEND_URL+'api/phonenubmer/resend?type=mobile');
    return this.http.get(BACKEND_URL+'api/phonenumber/resend?type=mobile', option).map((res:Response) => {

        let user:any = res.json();
        
        console.log(user);
        return user;
    });

  }

  takeThePhoto() {
        this.camera.getPicture({
            sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
            destinationType: this.camera.DestinationType.FILE_URI,
            quality: 50,
            targetWidth: 720,
            correctOrientation: true,
            encodingType: this.camera.EncodingType.JPEG
        })
            .then(
            imageURI => {
                window['plugins'].crop.promise(imageURI, {
                    quality: 75
                }).then(newPath => {
                        return this.toBase64(newPath).then((base64Img) => {
                            this.base64Image = base64Img;
                            this.base64Image = this.resize(this.base64Image, 250, 250);
                        });
                    },
                    error => {
                        console.log("CROP ERROR -> " + JSON.stringify(error));
                        alert("CROP ERROR: " + JSON.stringify(error));
                    }
                    );
            },
            error => {
                console.log("CAMERA ERROR -> " + JSON.stringify(error));
                alert("CAMERA ERROR: " + JSON.stringify(error));
            }
            );
    }

    toBase64(url: string) {
        return new Promise<string>(function (resolve) {
            var xhr = new XMLHttpRequest();
            xhr.responseType = 'blob';
            xhr.onload = function () {
                var reader = new FileReader();
                reader.onloadend = function () {
                    resolve(reader.result);
                }
                reader.readAsDataURL(xhr.response);
            };
            xhr.open('GET', url);
            xhr.send();
        });
    }

    resize(base64Img, width, height) {
        var img = new Image();
        img.src = base64Img;
        var canvas = document.createElement('canvas'),ctx = canvas.getContext('2d');
        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);
        return canvas.toDataURL("image/jpeg");
    }

}
