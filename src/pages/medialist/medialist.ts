import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
// import {HttpHeaders} from "@angular/common/http";
import { Storage } from '@ionic/storage';
import {InAppBrowser} from '@ionic-native/in-app-browser'

/*for sharing images in social media*/
import { SocialSharing } from '@ionic-native/social-sharing';
import { HTTP } from '@ionic-native/http';
import {HomePage} from "../home/home";
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
  public servererror:any;

      constructor(public navCtrl: NavController, public navParams: NavParams , public httpclient :HttpClient,public storage: Storage,private socialSharing: SocialSharing, public http:HTTP,public inappbrowser:InAppBrowser) {
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

      },3000);
      /*setTimeout(()=>{
          this.getBlastorpassBanner();
      },2000);*/

    });

  }


  getUserDetailsold(){

      this.http.post('http://developmentapi.audiodeadline.com:3090/datalist', {source:'user',condition:{_id_object:this.user_id}},{})
          .then(data => {
              alert('in getUserDetails call');
              //data received by server
              alert(this.user_id);
              var stringdata=JSON.stringify(data.data.res[0]);
              alert(stringdata);
              //alert(stringdata.res);
             // alert(data);
              let dataFromNative:any=data;
              let dataval=JSON.parse(dataFromNative.data);
             // let datavalinstringify=JSON.stringify(dataval);
             // alert('datavalforstringify--');
             // alert(JSON.stringify(dataval));
              //let datavalforstringify=JSON.stringify(dataFromNative);
              //alert('userdetails ---- '+dataval.res[0]);
              this.username = dataval.res[0].username;
              if(dataval.res[0].sponserurl!=null){
                  this.sponserflag = 1;
                  this.sponserimage = dataval.res[0].sponserimage;
                  this.sponserurl = dataval.res[0].sponserurl;
              }else{
                  this.sponserflag = 0;
              }

          })
          .catch(error => {


              if(error == 'cordova_not_available'){
                  console.log('success');
                  alert(this.user_id);
                  this.userdetails = this.httpclient.post('http://developmentapi.audiodeadline.com:3090/datalist',{source:'user',condition:{_id_object:this.user_id}},{});
                  this.userdetails
                      .subscribe(data => {
                          // console.log('my data: ', data);
                          let result:any;
                          result = data;
                          alert(result);
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
 getUserDetails(){
      this.userdetails = this.httpclient.post('http://developmentapi.audiodeadline.com:3090/datalist',{source:'user',condition:{_id_object:this.user_id}},{});
      this.userdetails
          .subscribe(data => {
              // console.log('my data: ', data);
              let result:any;
              result = data;
              //alert(result);
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
    /*this.userdetails = this.httpclient.post('http://developmentapi.audiodeadline.com:3090/datalist',{source:'user',condition:{_id_object:this.user_id}});*/
    /*this.userdetails
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
      this.artistxpSignBanner = this.httpclient.post('http://developmentapi.audiodeadline.com:3090/datalist',{source:'mediaview',condition:{"type":10,"status":1}},{});
      this.artistxpSignBanner
          .subscribe(data => {
              // console.log('my data: ', data);
              let result:any;
              result = data;
              console.log('result of getartistxpSignBanner');
              console.log(result.res);
              this.blastorpassBannerList = result.res;

          })
  }

  /*---------------------------------------------------------------*/
    /*getartistxpSignBanner(){
        this.http.post('http://developmentapi.audiodeadline.com:3090/datalist',{source:'mediaview',condition:{"type":9,"status":1}},{})
            .then(data=>{

                let dataFromNative:any=data;
                alert('dataFromNative');
                alert(dataFromNative);
                //let dataval=JSON.parse(dataFromNative);
               // alert(dataval);
                if(dataFromNative.status=='error'){
                    this.servererror=dataFromNative.msg;
                 }
                 if(dataFromNative.status=='success'){
                    alert(dataFromNative);
                    this.artistxpSignBannerList=dataFromNative.res;
                    alert(this.artistxpSignBannerList);
                }

            })
            .catch(error=>{
                alert('in native http error for artistxpSignBanner');
                alert(error);
                //console.log(error);
                if(error=='cordova_not_available'){
                    alert('success for artistxpSignbanner');
                 console.log('success for artistxpSignbanner');
                /!*  alert(this.artistxpSignBanner=this.httpclient.post('http://developmentapi.audiodeadline.com:3090/datalist',  {source:'mediaview', condition:{"type":9,"status":1}}, {}));*!/

                    this.artistxpSignBanner=this.httpclient.post('http://developmentapi.audiodeadline.com:3090/datalist', {source:'mediaview',condition:{"type":9,"status":1}}, {});
                    this.artistxpSignBanner.subscribe(data=> {
                        //alert(data);
                            console.log('artistxpbannerdata:',data);
                            let result:any;
                            result= data.res;
                            //alert(result1);
                            console.log('result of artistxpSignBanner');
                            alert(result);
                            console.log(result);
                            this.artistxpSignBannerList=result;
                             console.log('artistxpSignBannerList');
                             console.log(this.artistxpSignBannerList);
                        });


                }

            })
    }*/
 /*   getartistxpSignBanner(){
        this.http.post('http://developmentapi.audiodeadline.com:3090/datalist', {source:'mediaview',condition:{"type":9,"status":1}},{})
            .then(data => {

                //data received by server
                let dataFromNative:any=data;
                alert(dataFromNative);
                if(dataFromNative.status=='error'){
                    // alert('Login error!');
                    this.servererror=dataFromNative.msg;
                }
                if(dataFromNative.status=='success'){

                    let dataval=JSON.parse(dataFromNative.data);
                    alert(dataval);
                    alert(dataval.res);
                    this.artistxpSignBannerList = dataval.res;
                     alert(this.artistxpSignBannerList);
                }


            })
            .catch(error => {

                 alert('in native http error');
                 alert(error);
                 console.log(error);
                if(error == 'cordova_not_available'){
                    console.log('success');
                    this.artistxpSignBanner = this.httpclient.post('http://developmentapi.audiodeadline.com:3090/datalist',{source:'mediaview',condition:{"type":9,"status":1}},{});
                    this.artistxpSignBanner
                        .subscribe(data => {
                            // console.log('my data: ', data);
                            let result:any;
                            result = data;
                            console.log('result of artistxpSignBannerList');
                            console.log(result.res);
                            this.artistxpSignBannerList = result.res;


                        });
                }

            });
    }*/
  /*----------------------------------------------------------------*/

  getBlastorpassBannerhttp(){
      this.http.post('http://developmentapi.audiodeadline.com:3090/datalist', {source:'mediaview',condition:{"type":10,"status":1}},{})
          .then(data => {

              //data received by server
              let dataFromNative:any=data;
              // alert('data');
              // alert(d);
              // alert((d.status));
              // alert((d.data));
              let dataval=JSON.parse(dataFromNative.data);
              let datavalinstringify=JSON.stringify(dataFromNative.data);/*if we stringify the data then we can show the data in alert otherwise it show the [object][object]*/
                  //alert(dataval);
                 // alert(dataval.res);
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
       // console.log('https://developmentapi.audiodeadline.com/nodeserver/uploads/banner/'+image);
        this.socialSharing.shareViaInstagram('Message for instagram','https://developmentapi.audiodeadline.com/nodeserver/uploads/banner/'+image).then(()=>{
            // alert('in insta call');
            // alert('https://developmentapi.audiodeadline.com/nodeserver/uploads/banner/'+image);
        }).catch (()=>{

            // alert('in share catch');
        });
    }

    instashareNew(image){
       // console.log('https://developmentapi.audiodeadline.com/nodeserver/uploads/banner/'+image);
        this.socialSharing.shareViaInstagram('http://devshare.artistxp.com/sharetool2.php?media_id='+image+'&username='+this.username+'&image='+image+'&submittype=signup','http://devshare.artistxp.com/sharetool2.php?media_id='+image+'&username='+this.username+'&image='+image+'&submittype=signup').then(()=>{
            // alert('in insta call');
            // alert('https://developmentapi.audiodeadline.com/nodeserver/uploads/banner/'+image);
        }).catch (()=>{

            // alert('in share catch');
        });
    }
    twittershare(image){
        //alert('http://devshare.artistxp.com/sharetool2.php?media_id='+image+'&username='+this.username+'&image='+image+'&submittype=signup');
        this.socialSharing.shareViaTwitter('test',null, 'http://devshare.artistxp.com/sharetool2.php?media_id='+image+'&username='+this.username+'&image='+image+'&submittype=signup');
        /*this.socialSharing.shareViaTwitter('test','https://developmentapi.audiodeadline.com/nodeserver/uploads/banner/'+image).then(()=>{
            alert('in insta call');
            alert('https://developmentapi.audiodeadline.com/nodeserver/uploads/banner/'+image);
        }).catch (()=>{
            alert('in share catch');
        });*/
    }
    facebookShare(image){
       // alert('https://developmentapi.audiodeadline.com/nodeserver/uploads/banner/'+image);
        this.socialSharing.shareViaFacebook('test', 'https://developmentapi.audiodeadline.com/nodeserver/uploads/banner/'+image, 'http://devshare.artistxp.com/sharetool2.php?media_id='+image+'&username='+this.username+'&image='+image+'&submittype=signup');
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MedialistPage');
  }
  gotomedia(){
        this.inappbrowser.create('https://development.artistxp.com/','_system');

  }
  gotoLinkedin(image){

        this.inappbrowser.create('https://www.linkedin.com/shareArticle?url=http%3A%2F%2Fdevshare.artistxp.com%2Fsharetool2.php%3Fmedia_id%3D'+image+'%26username%3D'+this.username+'%26image%3D'+image+'%26submittype%3Dsignup','_system');

  }

  gotoTumblr(image){
        this.inappbrowser.create('https://www.tumblr.com/widgets/share/tool?shareSource=legacy&canonicalUrl=http%3A%2F%2Fdevshare.artistxp.com%2Fsharetool2.php%3Fmedia_id%3D'+image+'%26username%3D'+this.username+'%26image%3D'+image+'%26submittype%3Dsignup','_system');


  }
  logout(){
      this.storage.clear().then(()=>{
          console.log('storage clear');
          this.navCtrl.setRoot(HomePage);
      });

  }


}
