import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController,ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { ListeAnnoncePage } from '../liste-annonce/liste-annonce';
import {StorageUtils} from '../../Utils/storage.utils';
import { LoginServiceProvider } from '../../providers/login-service/login-service';
import {User} from '../../Classes/user';
import { PhonePage } from '../phone/phone';
import { Toast } from '@ionic-native/toast';
import { Http,Response,Headers,RequestOptions} from '@angular/http';
import { ConnectivityServiceProvider } from '../../providers/connectivity-service/connectivity-service';

/**
 * Generated class for the CodeValidatePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-code-validate',
  templateUrl: 'code-validate.html',
})
export class CodeValidatePage {
	myFormulaire: FormGroup;
	phoneNumer : any;
	user : any;
	token : any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loading: LoadingController,public formBuilder: FormBuilder, public loginService:LoginServiceProvider, public userService:UserServiceProvider, public viewCtrl: ViewController, public toast: Toast, public connectivityService:ConnectivityServiceProvider) {
  	this.myFormulaire = formBuilder.group({
      code: ['', Validators.compose([Validators.maxLength(4), Validators.pattern('[0-9 ]*'), Validators.required])]
    });

    if(navParams.get("user") !== "undefined" && navParams.get("token") !== "undefined" ){
        this.user = navParams.get("user");
        this.token = navParams.get("token");
        console.log(this.user);
        console.log(this.token); 

        //this.myFormulaire.controls['telephone'].setValue(this.phoneNumer); 
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CodeValidatePage');
  }

  validatePhoneNumer(){
  	if(!this.myFormulaire.valid){
      console.log("Remplissez tous les champs!");
      this.showToast("Remplissez tous les champs!");
    }
    else
    {
    	this.connectivityService.checkNetwork();
    	let loader = this.loading.create({
	    content: 'Chargement en cours...',
	  	});

	  	loader.present().then(() => {
	  		var json = this.myFormulaire.value;
	  		let option = new RequestOptions({
		        headers: new Headers({
		          'Accept': 'application/json',
		          'Authorization': 'Bearer ' +this.token
		        })
	        });

		    this.userService.validateCode(json.code,option).subscribe(
			      data => 
			      {
			         
			          console.log(data.message);
			          if(data.text=='ok'){
				          let loginData:any = this.user;
		                  let user:User = this.loginService.readJwt(this.token);
		                  //user.username = json.login;
		                  //user.password = json.motpasse;

		                  console.log('Remember me: Store user and jwt to local storage');
		                  StorageUtils.setAccount(user);
		                  StorageUtils.setToken(this.token);
		                  console.log('Login successful', user);
		                  this.goListeAnnonce();
		                  this.viewCtrl.dismiss();			     
			          }
			          else{
			          	console.log(data.message);
			          	this.showToast(data.message);

			          }
			          
			      },
			      err => {
			          console.log(err);
			          loader.dismiss();
			          this.showToast("Une erreur est survenue reessayer plus tard");
			      },
			      () => {loader.dismiss()}

			   ); 
		  });
	  }
  }

  goListeAnnonce(){
    this.navCtrl.push(ListeAnnoncePage,{
        'token': 'token',
        'user': 'user'});
  }

  renvoyerCode(){
  	this.connectivityService.checkNetwork();
  	let loader = this.loading.create({
	    content: 'Chargement en cours...',
	});
	loader.present().then(() => {
			let option = new RequestOptions({
		        headers: new Headers({
		          'Accept': 'application/json',
		          'Authorization': 'Bearer ' +this.token
		        })
	        });
		    this.userService.resendCode(option).subscribe(
			      data => 
			      {
			         
			          console.log(data.message);
			          if(data.message=='ok'){
			          	this.navCtrl.push(PhonePage,{
        					'token': this.token,
        					'user': this.user});
        					this.viewCtrl.dismiss();   			     
			          }
			          else{
			          	this.showToast(data.message)
			          	console.log(data.message);

			          }
			          
			      },
			      err => {
			          console.log(err);
			          loader.dismiss();
			          this.showToast("Une erreur est survenue reessayer plus tard");
			      },
			      () => {loader.dismiss()}

			   ); 
		  });
  }

  showToast(titre)
  {
	this.toast.show(titre, '5000', 'bottom').subscribe(
	    toast => {
	    }
	);
  }

}
