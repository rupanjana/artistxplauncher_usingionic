import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import {FormBuilder, FormGroup,FormControl, Validators} from '@angular/forms';
import { Storage } from '@ionic/storage';
import { HTTP } from '@ionic-native/http';
import { HttpClient } from '@angular/common/http';
/**
 * Generated class for the ContactusPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contactus',
  templateUrl: 'contactus.html',
})
export class ContactusPage {
  private contactusform:FormGroup;
  public contactushttpclient:any;
  public contactusrecordget:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public formBuild:FormBuilder,public storage: Storage, public http: HTTP, public httpClient: HttpClient,public alertctrl:AlertController) {
    this.contactusform=this.formBuild.group({
      firstname:["",Validators.required],
      lastname:["",Validators.required],
      phoneno:["",Validators.required],
     /* email: ["",Validators.compose([Validators.required,ContactusPage.customValidator])],*/
      email: ['', Validators.compose([Validators.required, Validators.pattern(/^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/)])],
      address:["",Validators.required],
      message: ["",Validators.required]
    });
  }
  /* email: ["",Validators.compose([Validators.required, LoginPage.customValidator])],*/


  contactussubmit(){
   // console.log(this.contactusform.value);
    console.log(this.contactusform.controls['email'].valid);
    console.log(this.contactusform.controls['email'].touched);
   // console.log(this.contactusform.controls['email'].pristine);
    for(let i in this.contactusform.controls){
      this.contactusform.controls[i].markAsTouched();

    }
    console.log(this.contactusform.value);
    if(this.contactusform.valid){
      let formvalue:any = {};
      formvalue=this.contactusform.value;
      formvalue.fullname = this.contactusform.controls['firstname'].value+' '+this.contactusform.controls['lastname'].value;
      console.log(formvalue);

    this.contactushttpclient = this.httpClient.post('https://developmentapi.audiodeadline.com/server.php?q=contactus',formvalue);
    this.contactushttpclient
        .subscribe(data=>{
          console.log(JSON.stringify(data));
          let resultdata=data;
          if(resultdata.status=='success'){
           this.contactusrecordget=resultdata.data.ops[0];
           // alert(JSON.stringify(this.contactusrecordget));
            this.presentAlert();
            this.contactusform.reset();/*form reset*/



          }

          else{
            console.log('error');
          }
        });
    }
   /* else{
    //  this.presentAlert();

    }*/
  }

  presentAlert() {
    let alert = this.alertctrl.create({
      message: 'The Contact us Form is successfully submitted',
      buttons: ['Okay']
    });
    alert.present();
  }

/*static customValidator(inputemail):any{
  console.log('inputemail');
  console.log(inputemail);

  if(inputemail.pristine){
   return null;
  }
  inputemail.markAsTouched();
  let filter=/^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
  if(String(inputemail.value).search(filter)==-1){
    console.log('Invalid email...formatmat doesnot match');
    return{
      invalidEmail:true
    };
  }

}*/

  static customValidator(inputEmail): any{
    console.log('inputEmail');
    console.log(inputEmail);


    if(inputEmail.pristine){
      return null;
    }

    inputEmail.markAsTouched();


    let filter = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
    console.log( String(inputEmail.value).search (filter) != -1);
    if(String(inputEmail.value).search (filter) == -1){
      console.log('valid');
      return{
        invalidEmail:true
      };
    }
    /* else {
     //return false;
     console.log('invalid ...');
     return false;

     }*/

    /*return{
     invalidEmail:true
     };*/
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactusPage');
  }

}
