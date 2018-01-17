import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera } from '@ionic-native/camera';
import { Toast } from '@ionic-native/toast';
import { ConnectivityServiceProvider } from '../../providers/connectivity-service/connectivity-service';


/**
 * Generated class for the ProfilPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-profil',
  templateUrl: 'profil.html',
})
export class ProfilPage {
	users: Array<any>;
	id: any;
	nom:any;
	username: any; 
	numTelephone: any;
	email: any;
	dateNaissance: any;
	password: any;
	prenom: any;
	imageProfil: any;
	myFormulaire: FormGroup;
	formBuilde: FormBuilder;
	base64Image:any;
  link: any;
  value : any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
   public userService:UserServiceProvider, public loading: LoadingController,public formBuilder: FormBuilder, public camera:Camera, public toast: Toast, public connectivityService:ConnectivityServiceProvider) {

   	this.myFormulaire = formBuilder.group({
      nom: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      anniversaire: ['', Validators.compose([Validators.maxLength(30), Validators.required])],
      email: [''],
      prenom: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9 ]*'),Validators.required])],
      username: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9]*'), Validators.required])],
      telephone: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9 ]*'), Validators.required])],
      password: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9 ]*'), Validators.required])],
      indicatif: ['']
    });

    this.link = this.userService.getLink();
    console.log(this.link);
    this.value =0;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilPage');
    this.connectivityService.checkNetwork();
    let loader = this.loading.create({
    content: 'Chargement en cours...',
  	});

  	loader.present().then(() => {

	    this.userService.tableauDeBord().subscribe(
		      data => {
		          this.users = data.user; 
		          this.nom = data.user.nom;
		          this.username = data.user.username;
		          this.numTelephone = data.user.numero_telephone;
		          this.imageProfil = data.user.image;
		          this.email = data.user.email;
		          this.dateNaissance = data.user.anniversaire;
		        
		          let tabDate:Array<any> = this.dateNaissance.split('T');
        		  let birthday:any = tabDate[0];
		          this.prenom = data.user.prenom
		          this.password = data.user.password;
		          console.log(this.numTelephone);
		          this.myFormulaire.controls['prenom'].setValue(this.prenom);
		          this.myFormulaire.controls['nom'].setValue(this.nom);
		          this.myFormulaire.controls['username'].setValue(this.username);
		          this.myFormulaire.controls['email'].setValue(this.email);
		          this.myFormulaire.controls['telephone'].setValue(this.numTelephone);
		          this.myFormulaire.controls['anniversaire'].setValue(birthday);
		      },
		      err => {
		          console.log(err);
		          loader.dismiss();
		      },
		      () => {loader.dismiss()}

		);
		  
	});
  }

  editUser(){
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

		    this.userService.editUser(json.nom, json.prenom, json.username, json.email, json.anniversaire, json.indicatif+json.telephone,json.password).subscribe(
			      data => {
			         
			          console.log(data.message);
                this.showToast(data.message);
			      },
			      err => {
			          console.log(err);
			          loader.dismiss();
                this.showToast("Une erreur s'est produite Reessayer plus tard");
			      },
			      () => {loader.dismiss()}

			);
			  
		 });
	  }
  }

  showToast(titre)
  {
    this.toast.show(titre, '5000', 'bottom').subscribe(
      toast => {
      }
    );
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
                            this.imageProfil = this.base64Image;
                            this.value =1;
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
