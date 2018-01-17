import {Injectable,Inject} from '@angular/core';
import {Http,Headers,Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import { AlertController,LoadingController} from 'ionic-angular';
import {User} from '../../Classes/user';
import {StorageUtils} from '../../Utils/storage.utils';
import 'rxjs/add/operator/map';
import { ListeAnnoncePage } from '../../pages/liste-annonce/liste-annonce';

const CONTENT_TYPE_HEADER:string = 'Content-Type';
const APPLICATION_JSON:string = 'application/json';
//const BACKEND_URL:string = 'http://aims.avanquest.com/restau-prive/web/app_dev.php/api/login';
const BACKEND_URL:string = 'http://213.246.59.111/restau-priv/web/app_dev.php/api/login';

/*
  Generated class for the LoginServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class LoginServiceProvider {

  constructor(public http: Http,private alertCtrl: AlertController, public loading: LoadingController) {
    console.log('Hello LoginServiceProvider Provider');

  }

  getLink(){
    let link:Array<any> = BACKEND_URL.split('web');
    return link[0]+'web/';
  }

  dologin(username:string,password:string,rememberMe:boolean){
    let headers = new Headers();
    headers.append(CONTENT_TYPE_HEADER, APPLICATION_JSON);
    return this.http.get(BACKEND_URL+"?password="+password+"&username="+username).map((res:Response) => {
        let user:any = res.json();
        console.log(user);
        return user;
    });
  }

  login(username:string,password:string,rememberMe:boolean) {
    let loader = this.loading.create({
      content: 'Connexion en cours...',
    });
        
    let headers = new Headers();
    headers.append(CONTENT_TYPE_HEADER, APPLICATION_JSON);

    loader.present().then(() => {
      this.http.get(BACKEND_URL+"?password="+password+"&username="+username)
      .subscribe(data => {
      var alert = this.alertCtrl.create({
      title: "Message",
      subTitle: data.json().origin,
      message: data.json().message,
      buttons: ["close"]
      });
      if(data.json().message=='ok'){
    
      let loginData:any = data.json();
      let user:User = this.readJwt(loginData.token);
      user.username = username;
      user.password = password;

      console.log('Remember me: Store user and jwt to local storage');
      StorageUtils.setAccount(user);
      StorageUtils.setToken(loginData.token);

      console.log('Login successful', user);

      if (rememberMe) {
            console.log('Remember me: Store user and jwt to local storage');
            StorageUtils.setAccount(user);
            StorageUtils.setToken(loginData.token);
      }
      }
      else{
        alert.present();
      }

      //this.emptyField;
      console.log(data.json());
      }, error => {
        console.log(JSON.stringify(error.json()));
      },
      () => {loader.dismiss()}
    );
  });
    

           /* return this.http.post(BACKEND_URL,JSON.stringify({login:username,password:password}),{headers:headers}).map((res:Response) => {

                let loginData:any = res.json();
                if(loginData.message=='ok'){

                	let user:User = this.readJwt(loginData.token);
                	user.username = username;
                	user.password = password;
                	StorageUtils.setAccount(user);
                    StorageUtils.setToken(loginData.token);

                	console.log('Login successful', user);


                if (rememberMe) {
                    console.log('Remember me: Store user and jwt to local storage');
                    StorageUtils.setAccount(user);
                    StorageUtils.setToken(loginData.token);
                }
                return user;
                }
                else{
	                let alert = this.alertCtrl.create({
		                title: 'Invalid credentials',
		                subTitle: 'loginData.message !',
		                buttons: ['Ok']
	            	});
                	return Observable.throw(alert);

                }  
            });*/
        
    }

    public readJwt(token:string):User {
        let tokens:Array<any> = token.split('.');
        let tokenPayload:any = JSON.parse(atob(tokens[1]));
        console.log(tokenPayload);

        let user:User = new User();
        user.lastConnection = new Date();
        user.id = parseInt(tokenPayload.iss);
        user.email = tokenPayload.sub;
        user.firstName = tokenPayload.firstName;
        user.lastName = tokenPayload.lastName;
        user.roles = tokenPayload.role;

        return user;
    }

}
