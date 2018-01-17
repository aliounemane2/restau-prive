import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController,ViewController} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { CodeValidatePage } from '../code-validate/code-validate';
import { ListeAnnoncePage } from '../liste-annonce/liste-annonce';
import { Http,Response,Headers,RequestOptions} from '@angular/http';
import { Toast } from '@ionic-native/toast';
import { ConnectivityServiceProvider } from '../../providers/connectivity-service/connectivity-service';

/**
 * Generated class for the PhonePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-phone',
  templateUrl: 'phone.html',
})
export class PhonePage {
	myFormulaire: FormGroup;
	phoneNumer : any;
	user : any;
	token : any;
  link : any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loading: LoadingController,public formBuilder: FormBuilder, public userService:UserServiceProvider,public viewCtrl: ViewController, public toast: Toast, public connectivityService:ConnectivityServiceProvider) {
    this.link = this.userService.getLink();
    console.log(this.link);
  	this.myFormulaire = formBuilder.group({
      telephone: ['', Validators.compose([Validators.maxLength(15), Validators.pattern('[0-9 ]*'), Validators.required])],
      indicatif: ['', Validators.compose([Validators.maxLength(5), Validators.required])]
    });

    if(navParams.get("user") !== "undefined" && navParams.get("token") !== "undefined" ){
        this.user = navParams.get("user");
        this.token = navParams.get("token");
        this.phoneNumer = this.user.numero_telephone
        console.log(this.user);
        console.log(this.token); 

        this.myFormulaire.controls['telephone'].setValue(this.phoneNumer); 
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PhonePage');
  }

  requestPhoneNumer(){
  	if(!this.myFormulaire.valid){
      console.log("remplissez tous les champs!");
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

		    this.userService.requestPhoneNumer(json.indicatif+json.telephone,option).subscribe(
			      data => {
			         
			          console.log(data.message);
                if(data.text=='ok'){
                this.goListeAnnonce(this.user,this.token);
                this.viewCtrl.dismiss();
                }
                else{
                  console.log('Veuillez mettre un bon numero de telephone');
                  this.showToast("Veuillez mettre un bon numero de telephone");
                }
			      },
			      err => {
			          console.log(err);
			          loader.dismiss();
                this.showToast("Une erreur est survenue reessayer plus tard");
                //this.goToValidation(this.user,this.token);
                //this.goListeAnnonce(this.token,this.user);
                //this.viewCtrl.dismiss();
			      },
			      () => {loader.dismiss()}

			   ); 
		  });
	  }
  }

  goToValidation(user,token){
    this.navCtrl.push(CodeValidatePage,{
      'token': token,
      'user': user});
  }

  goToPhone(user,token){
    this.navCtrl.push(PhonePage,{
      'token': token,
      'user': user});
  }

  goListeAnnonce(token, user){
    this.navCtrl.push(CodeValidatePage,{
        'token': token,
        'user': user});
  }

  showToast(titre)
  {
    this.toast.show(titre, '5000', 'bottom').subscribe(
        toast => {
        }
    );
  }

}
