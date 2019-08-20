import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import {map} from "rxjs/operator/map";
import {HttpHeaders} from "@angular/common/http";
import { Storage } from '@ionic/storage';
import {MedialistPage} from "../medialist/medialist";
import { HTTP } from '@ionic-native/http';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public formdata:any={};
  public showerror:boolean=false;
  public password:any=null;
  public films:any=null;
  public selmenu:any=null;
  public servererror:any=null;
  public user_id:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public httpClient: HttpClient,private storage: Storage,private http: HTTP) {
      this.storage.get('userid').then((val) => {
          this.user_id = val;
         console.log('user_id is exist or not--');
         console.log(this.user_id);
         if(this.user_id!=null){
             this.navCtrl.push(MedialistPage);
         }
         else{
          // this.navCtrl.push(LoginPage);
           console.log('it is in Login Page')
           }
         /* setTimeout(()=>{
              // this.getTicketsaleBanner();


          },1000);*/
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  loginsubmit(){
      // alert(65);
      const httpOptions = {
          headers: new HttpHeaders({
              'Content-Type':  'application/json'
          })
      };

      this.http.post('http://developmentapi.audiodeadline.com:3090/loginasuser', this.formdata,{})
          .then(data => {

             //ata received by server
              let d:any=data;
              // alert('data');
              // alert(d);
              // alert((d.status));
              // alert((d.data));
             let dataval=JSON.parse(d.data);
              if(dataval.status=='error'){
                  // alert('Login error!');
                  this.servererror=dataval.msg;
              }
              if(dataval.status=='success'){
                   //alert('Login suceess!');
                  this.storage.set('userid',dataval.msg._id);
                  this.storage.set('useremail',dataval.msg.email);
                  this.storage.set('firstname',dataval.msg.firstname);
                  this.storage.set('lastname',dataval.msg.lastname);
                  this.storage.set('sponcerurl',dataval.msg.sponserurl);
                  this.storage.set('sponserimage',dataval.msg.sponserimage);
                  this.storage.set('username',dataval.msg.username);
                  this.navCtrl.push(MedialistPage);

              }
             // alert(dataval);
             // alert(dataval.status);
             // alert(dataval.msg);
             // alert(dataval.msg._id);

          })
          .catch(error => {

              // alert('in native http error');
              // alert(error);
              // console.log(error);
              if(error == 'cordova_not_available'){
                  console.log('success');
                  this.films = this.httpClient.post('http://developmentapi.audiodeadline.com:3090/loginasuser',this.formdata);
                  this.films
                      .subscribe(data => {
                          // console.log('my data: ', data);
                          let result:any;
                          result = data;
                          if(result.status=='error'){
                              // alert('Login error!');
                              this.servererror=data.msg;
                          }
                          if(result.status=='success'){
                              // alert('Login suceess!');
                              this.storage.set('userid',result.msg._id);
                              this.storage.set('useremail',result.msg.email);
                              this.storage.set('firstname',result.msg.firstname);
                              this.storage.set('lastname',result.msg.lastname);
                              this.storage.set('sponcerurl',result.msg.sponserurl);
                              this.storage.set('sponserimage',result.msg.sponserimage);
                              this.storage.set('username',result.msg.username);
                              this.navCtrl.push(MedialistPage);

                          }
                      });
              }

          });



    console.log('this.formdata');
    console.log(this.formdata);
    this.showerror=true;

  }
  seterrortonull(){
    this.showerror=false;
    this.servererror=false;

  }

}
