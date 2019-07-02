import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
// import {HttpHeaders} from "@angular/common/http";
import { Storage } from '@ionic/storage';
// import {ShareinstagramPage} from "../shareinstagram/shareinstagram";

/*for sharing images in social media*/
import { SocialSharing } from '@ionic-native/social-sharing';
import { HTTP } from '@ionic-native/http';
/**
 * Generated class for the MedialistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-medialist',
  templateUrl: 'medialist.html',
})
export class MedialistPage {
  public data: any;
  public userdetails: any;
  public user_id: any='';
  public sponserflag:any=0;
  public sponserurl:any='';
  public sponserimage:any='';
  public username: any;
  public ticketBanner: any;
  public artistxpSignBanner: any;
  public blastorpassBanner: any;
  // public ticketBannerList: any;
  public artistxpSignBannerList: any;
  public blastorpassBannerList: any;

  constructor(public navCtrl: NavController, public navParams: NavParams , public httpclient :HttpClient,public storage: Storage,private socialSharing: SocialSharing, public http:HTTP) {
    /*console.log('this.storage.get');
    console.log(this.storage.get('userid'));*/
    this.storage.get('userid').then((val) => {
      // console.log('Your id is', val);
      this.user_id = val;
      this.getUserDetails();
      setTimeout(()=>{
          // this.getTicketsaleBanner();
          this.getartistxpSignBanner();
          this.getBlastorpassBanner();

      },1000);
      /*setTimeout(()=>{
          this.getBlastorpassBanner();
      },2000);*/

    });

  }

  getUserDetails(){
      this.http.post('http://developmentapi.audiodeadline.com:3090/datalist', {source:'user',condition:{_id_object:this.user_id}},{})
          .then(data => {

              //data received by server
              let dataFromNative:any=data;
              // alert('data');
              // alert(d);
              // alert((d.status));
              // alert((d.data));
              let dataval=JSON.parse(dataFromNative.data);
              alert(dataval);
              alert(dataval.res);
              this.username = dataval.res[0].username;
              if(dataval.res[0].sponserurl!=null){
                  this.sponserflag = 1;
                  this.sponserimage = dataval.res[0].sponserimage;
                  this.sponserurl = dataval.res[0].sponserurl;
              }else{
                  this.sponserflag = 0;
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
                  this.userdetails = this.httpclient.post('http://developmentapi.audiodeadline.com:3090/datalist',{source:'user',condition:{_id_object:this.user_id}},{});
                  this.userdetails
                      .subscribe(data => {
                          // console.log('my data: ', data);
                          let result:any;
                          result = data;
                          this.username = result.res[0].username;
                          if(result.res[0].sponserurl!=null){
                              this.sponserflag = 1;
                              this.sponserimage = result.res[0].sponserimage;
                              this.sponserurl = result.res[0].sponserurl;
                          }else{
                              this.sponserflag = 0;
                          }
                          // console.log(this.sponserflag);

                      });
              }

          });
   /* this.userdetails = this.httpclient.post('http://developmentapi.audiodeadline.com:3090/datalist',{source:'user',condition:{_id_object:this.user_id}});
    this.userdetails
        .subscribe(data => {
          // console.log('my data: ', data);
          let result:any;
          result = data;
          this.username = result.res[0].username;
          if(result.res[0].sponserurl!=null){
              this.sponserflag = 1;
              this.sponserimage = result.res[0].sponserimage;
              this.sponserurl = result.res[0].sponserurl;
            }else{
              this.sponserflag = 0;
            }
            // console.log(this.sponserflag);

        })*/
  }
  getTicketsaleBanner(){
      this.ticketBanner = this.httpclient.post('http://developmentapi.audiodeadline.com:3090/datalist',{source:'mediaview',condition:{"type":7,"status":1}});
      this.ticketBanner
          .subscribe(data => {
              // console.log('my data: ', data);
              let result:any;
              result = data;
              console.log('result of getTicketsaleBanner');
              console.log(result);
              // this.ticketBannerList = result.res;

          })
  }
  getartistxpSignBanner(){
      this.artistxpSignBanner = this.httpclient.post('http://developmentapi.audiodeadline.com:3090/datalist',{source:'mediaview',condition:{"type":9,"status":1}},{});
      this.artistxpSignBanner
          .subscribe(data => {
              // console.log('my data: ', data);
              let result:any;
              result = data;
              console.log('result of getartistxpSignBanner');
              console.log(result.res);
              this.artistxpSignBannerList = result.res;

          })
  }
  getBlastorpassBanner(){
      this.http.post('http://developmentapi.audiodeadline.com:3090/datalist', {source:'mediaview',condition:{"type":10,"status":1}},{})
          .then(data => {

              //data received by server
              let dataFromNative:any=data;
              // alert('data');
              // alert(d);
              // alert((d.status));
              // alert((d.data));
              let dataval=JSON.parse(dataFromNative.data);
                  alert(dataval);
                  alert(dataval.res);
                  this.blastorpassBannerList = dataval.res;
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
                  this.blastorpassBanner = this.httpclient.post('http://developmentapi.audiodeadline.com:3090/datalist',{source:'mediaview',condition:{"type":10,"status":1}},{});
                  this.blastorpassBanner
                      .subscribe(data => {
                          // console.log('my data: ', data);
                          let result:any;
                          result = data;
                          console.log('result of getBlastorpassBanner');
                          console.log(result.res);
                          this.blastorpassBannerList = result.res;


                      });
              }

          });
      /*this.blastorpassBanner = this.httpclient.post('http://developmentapi.audiodeadline.com:3090/datalist',{source:'mediaview',condition:{"type":10,"status":1}});
      this.blastorpassBanner
          .subscribe(data => {
              // console.log('my data: ', data);
              let result:any;
              result = data;
              console.log('result of getBlastorpassBanner');
              console.log(result.res);
              this.blastorpassBannerList = result.res;

          })*/
  }

    instashare(image){
        console.log('https://developmentapi.audiodeadline.com/nodeserver/uploads/banner/'+image);
        this.socialSharing.shareViaInstagram('test','https://developmentapi.audiodeadline.com/nodeserver/uploads/banner/'+image).then(()=>{
            alert('in insta call');
            alert('https://developmentapi.audiodeadline.com/nodeserver/uploads/banner/'+image);
        }).catch (()=>{

            alert('in share catch');
        });
    }
    twittershare(image){
        console.log('https://developmentapi.audiodeadline.com/nodeserver/uploads/banner/'+image);
        alert('https://developmentapi.audiodeadline.com/nodeserver/uploads/banner/'+image);
        this.socialSharing.shareViaTwitter('test', 'https://developmentapi.audiodeadline.com/nodeserver/uploads/banner/'+image, null);
        /*this.socialSharing.shareViaTwitter('test','https://developmentapi.audiodeadline.com/nodeserver/uploads/banner/'+image).then(()=>{
            alert('in insta call');
            alert('https://developmentapi.audiodeadline.com/nodeserver/uploads/banner/'+image);
        }).catch (()=>{
            alert('in share catch');
        });*/
    }
    facebookShare(image){
        console.log('https://developmentapi.audiodeadline.com/nodeserver/uploads/banner/'+image);
        alert('https://developmentapi.audiodeadline.com/nodeserver/uploads/banner/'+image);
        this.socialSharing.shareViaFacebook('test', 'https://developmentapi.audiodeadline.com/nodeserver/uploads/banner/'+image, null);
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MedialistPage');
  }


}
