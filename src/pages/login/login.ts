import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,Alert,IonicApp,LoadingController, ViewController,App, Events} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Http} from '@angular/http';
import { DeposerUneannoncePage } from '../deposer-uneannonce/deposer-uneannonce';
import { ListeAnnoncePage } from '../liste-annonce/liste-annonce';
import {StorageUtils} from '../../Utils/storage.utils';
import {User} from '../../Classes/user';
//import {TranslatePipe, TranslateService} from 'ng2-translate/ng2-translate';
import { LoginServiceProvider } from '../../providers/login-service/login-service';
import { HomePage } from '../home/home';
import { PhonePage } from '../phone/phone';
import { Storage } from '@ionic/storage';
import { Toast } from '@ionic-native/toast';
import { ConnectivityServiceProvider } from '../../providers/connectivity-service/connectivity-service';



/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers:[LoginServiceProvider]
  //pipes: [TranslatePipe]
})
export class LoginPage {
  /*static get parameters(){
          return [[IonicApp]];
  }*/
	submitAttempt: boolean = false;

	myFormulaire: FormGroup;
  user : any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public formBuilder: FormBuilder,private http:Http,private alertCtrl: AlertController,private loginService:LoginServiceProvider, public loading: LoadingController,public viewCtrl: ViewController, public appCtrl: App,private toast: Toast, private events: Events,public storage: Storage, public connectivityService:ConnectivityServiceProvider) {
  	this.myFormulaire = formBuilder.group({
  		login: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9 ]*'), Validators.required])],
      motpasse: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9 ]*'), Validators.required])],
      rememberMe: ['']
  	});

    //this.loading = app.getComponent('loading');

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    let loader = this.loading.create({
    content: 'Chargement en cours...',
  });
  //this.showToast('connexion');
  }

  loginPost(event:Event) {
        // This will be called when the user clicks on the Login button
        if(!this.myFormulaire.valid){
      console.log("remplissez tous les champs!");
      this.submitAttempt = true;
    }
    else {
      //this.checkNetwork();
      var json = this.myFormulaire.value;
      console.log(this.myFormulaire.value);
     
      
     //this.makeGetRequestLogin(json.login,json.motpasse);
     event.preventDefault();
     this.loginService.login(json.login,json.motpasse,json.rememberMe);
     this.viewCtrl.dismiss();

    }
        
    }


  makeGetRequestLogin(username,password) {
    this.http.get("https://aims.avanquest.com/restau-priv/web/app_dev.php/api/login?password="+password+"&username="+username)
      .subscribe(data => {
        var alert = this.alertCtrl.create({
          title: "Message",
          subTitle: data.json().origin,
          message: data.json().message,
          buttons: ["close"]
        });
        if(data.json().message=='ok'){
          //this.goDeposerAnnonce(data.json().token,data.json().user)
          //this.goListeAnnonce();
          this.viewCtrl.dismiss();
        }
        else{
          alert.present();
        }

        //this.emptyField;
        console.log(data.json());
      }, error => {
        console.log(JSON.stringify(error.json()));
      });
  }

  doLogin(){
    if(!this.myFormulaire.valid){
      console.log("remplissez tous les champs!");
      this.showToast( "Remplissez tous les champs!");
    }
    else
    {
      var json = this.myFormulaire.value;
      this.connectivityService.checkNetwork();
      let loader = this.loading.create({
        content: 'Connexion en cours...',
      });

      loader.present().then(() => {

        this.loginService.dologin(json.login,json.motpasse,json.rememberMe).subscribe(
            data => {
                this.user = data; 
                console.log(this.user);
                if(this.user.message=='ok')
                {
                  console.log(this.user);
                  
                  let loginData:any = this.user;
                  let user:User = this.loginService.readJwt(loginData.token);
                  console.log(user);
                  user.username = json.login;
                  user.password = json.motpasse;
                  user.id =this.user.user.id;
                  user.firstName = this.user.user.prenom;
                  user.lastName = this.user.user.nom;
                  user.email = this.user.user.email;
                  console.log(user.id);
                  console.log('Remember me: Store user and jwt to local storage');
                  StorageUtils.setAccount(user);
                  StorageUtils.setToken(loginData.token);
                  console.log('Login successful', user);
                  this.goListeAnnonce();
                  this.viewCtrl.dismiss();
                  this.events.publish('user:signedIn', user);
                  this.events.publish('user:home', user);
                  this.events.publish('user:loadTabs', user);
                }else if (this.user.message=='ko'){
                  /*var alert = this.alertCtrl.create({
                  title: "Message",
                  subTitle: "Connexion",
                  message: this.user.message,
                  buttons: ["close"]
                  });

                  alert.present();*/
                  let loginData:any = this.user;
                  console.log(this.user.token);
                  //this.storage.set('tokenValidation', loginData.token);
                  this.goToPhone(this.user.user,this.user.token);
                  this.viewCtrl.dismiss();
                }
                else if (this.user.message=='noactive'){
                  this.showToast(this.user.texte);
                  /*var alert = this.alertCtrl.create({
                  title: "Message",
                  subTitle: "Connexion",
                  message: this.user.texte,
                  buttons: ["close"]
                  });

                  alert.present();*/

                }
                else{
                  /*var alert = this.alertCtrl.create({
                  title: "Message",
                  subTitle: "Connexion",
                  message: this.user.message,
                  buttons: ["close"]
                  });

                  alert.present();*/
                  this.showToast( this.user.message);

                }
                
            },
            err => {
                console.log(err);
                loader.dismiss();
            },
            () => {loader.dismiss()}

          );
      });
    }
  }

  login(){
    this.submitAttempt = false;
    if(!this.myFormulaire.valid){
      console.log("remplissez tous les champs!");
      this.submitAttempt = true;
    }
    else {
      //this.checkNetwork();
      var json = this.myFormulaire.value;
      console.log(this.myFormulaire.value);
     
      
     this.makeGetRequestLogin(json.login,json.motpasse);

    }
  }

  goDeposerAnnonce(token,user){
        this.navCtrl.push(DeposerUneannoncePage,{
        token: token,
        user: user});
    
  }

  goListeAnnonce(){
    this.navCtrl.push(ListeAnnoncePage,{
        'token': 'token',
        'user': 'user'});
  }

  goToPhone(user,token){
    this.navCtrl.push(PhonePage,{
      'token': token,
      'user': user});
  }

  showToast(titre){
    this.toast.show(titre, '5000', 'bottom').subscribe(
      toast => {
        console.log(toast);
      }
    );
  }


}
