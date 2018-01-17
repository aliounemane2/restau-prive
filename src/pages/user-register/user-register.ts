import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, LoadingController, ViewController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import { HttpModule } from '@angular/http';
import {StorageUtils} from '../../Utils/storage.utils';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { Toast } from '@ionic-native/toast';
import { LoginPage } from '../login/login';
import { ConnectivityServiceProvider } from '../../providers/connectivity-service/connectivity-service';


/**
 * Generated class for the UserRegisterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-user-register',
  templateUrl: 'user-register.html',
})
export class UserRegisterPage {
 submitAttempt: boolean = false;

 myFormulaire: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams,public formBuilder: FormBuilder,private http:Http,private alertCtrl: AlertController, public loading: LoadingController, public userService:UserServiceProvider,public viewCtrl: ViewController,private toast: Toast, public connectivityService:ConnectivityServiceProvider) {
   let token:any = StorageUtils.getToken();
   console.log(token);
  	this.myFormulaire = formBuilder.group({
      prenom: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      nom: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      email: ['',Validators.compose([Validators.maxLength(30), Validators.required])],
      telephone: ['', Validators.compose([Validators.maxLength(15), Validators.pattern('[0-9]*'), Validators.required]
      )],
      username: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9 ]*'), Validators.required])],
      motpasse: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9 ]*'), Validators.required])],
      confirmmotpasse: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9 ]*'), Validators.required])],
      myDate: ['', Validators.compose([Validators.maxLength(30), Validators.required])],
      cgu: [''],
      indicatif: ['']
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserRegisterPage');
  }

  saveUser(){
    this.submitAttempt = true;
    if(!this.myFormulaire.valid){
      console.log("remplissez tous les champs!");
    }
    else {
      //this.checkNetwork();
      var json = this.myFormulaire.value;
      if(json.motpasse != json.confirmmotpasse){
        var message ="Les mots de passes ne sont pas identiques";
        var subTitle ="Mot de passe";
        this.popup(subTitle, message);
        console.log("Les mots de passes ne sont pas identiques");
      }
      else{
        console.log(this.myFormulaire.value);
        let loader = this.loading.create({
          content: 'Chargement en cours...',
        });

        this.makeGetRequest(json.nom,json.prenom,json.telephone,json.motpasse,json.username,json.email,json.myDate);
      }
    }
  }

  emptyField(){
    //this.myFormulaire.value="";
  }

  makeGetRequest(nom,prenom,telephone,password,username,email,myDate) {
  var link= "https://aims.avanquest.com/restau-priv/web/app_dev.php/api/userregister?nom="+nom+"&prenom="+prenom+"&telephone="+telephone+"&password="+password+"&username="+username+"&email="+email+"&myDate="+myDate;
  console.log(link);
    this.http.get("https://aims.avanquest.com/restau-priv/web/app_dev.php/api/userregister?nom="+nom+"&prenom="+prenom+"&telephone="+telephone+"&password="+password+"&username="+username+"&email="+email+"&myDate="+myDate)
      .subscribe(data => {
        var alert = this.alertCtrl.create({
          title: "Message",
          subTitle: data.json().origin,
          message: data.json().message,
          buttons: ["close"]
        });

        alert.present();
        //this.emptyField;
      }, error => {
        console.log(JSON.stringify(error.json()));
      });
  }

  popup(subTitle,message){
    var alert = this.alertCtrl.create({
          title: "Message",
          subTitle: subTitle,
          message: message,
          buttons: ["close"]
        });

        alert.present();
  }
  createUser(){
    if(!this.myFormulaire.valid){
      console.log("remplissez tous les champs!");
    }
    else{
      this.connectivityService.checkNetwork();
      let loader = this.loading.create({
      content: 'Chargement en cours...',
      });
      var json = this.myFormulaire.value;
      if(json.motpasse != json.confirmmotpasse){
        var message ="Les mots de passes ne sont pas identiques";
        var subTitle ="Mot de passe";
        this.popup(subTitle, message);
        console.log("Les mots de passes ne sont pas identiques");
      }
      else{
        loader.present().then(() => {
        

        this.userService.createUser(json.nom,json.prenom,json.indicatif+json.telephone,json.motpasse,json.username,json.email,json.myDate).subscribe(
            data => {
            if(data.ok=='ok'){
              this.presentPromptOk(data.message);
              //this.showToast(data.message);
            }
            else{
            var subTitle ="Creation de compte";
              this.popup(subTitle, data.message);
              //this.viewCtrl.dismiss();
              this.showToast(data.message);
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
  }

  presentPromptOk(titre) {
    let alert = this.alertCtrl.create({
      title: titre,
      buttons: [
        {
          text: 'Ok',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
            this.navCtrl.push(LoginPage, {
            'notification': 'notification'
            });
          }
        }
      ]
    });
    alert.present();
  }

  showToast(titre){
    this.toast.show(titre, '5000', 'bottom').subscribe(
      toast => {
        /*this.navCtrl.push(LoginPage, {
            'notification': 'notification'
          });*/
      }
    );
  }

}
