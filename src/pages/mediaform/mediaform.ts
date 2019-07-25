import {Component, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams ,MenuController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
// import {HttpHeaders} from "@angular/common/http";
import { Storage } from '@ionic/storage';
import {InAppBrowser} from '@ionic-native/in-app-browser';
import { Content,AlertController } from 'ionic-angular';
import { Clipboard } from '@ionic-native/clipboard';

/*for sharing images in social media*/
import { SocialSharing } from '@ionic-native/social-sharing';
import { HTTP } from '@ionic-native/http';
import {HomePage} from "../home/home";
//import { MenuController } from '@ionic/angular';
/**
 * Generated class for the MedialistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-medialist',
  templateUrl: 'mediaform.html',
})
export class MediaformPage {
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
  public artistxpSignBannerList: any=[];
  public blastorpassBannerList: any=[];
  public servererror:any;
  public intervalForArtistxpBanner: any;
  public intervalForBlastBanner: any;
  public graburlset:any="https://development.audiodeadline.com/";
  @ViewChild(Content) pageTop: Content;


  constructor(public navCtrl: NavController, public navParams: NavParams , public httpclient :HttpClient,public storage: Storage,private socialSharing: SocialSharing, public http:HTTP,public inappbrowser:InAppBrowser,public alertctrl:AlertController,public clipboard:Clipboard,private menuctrl:MenuController) {
    /* openFirst() {
     this.menuctrl.enable(true, 'first');
     this.menuctrl.open('first');
     }*/

    this.storage.get('userid').then((val) => {
      this.user_id = val;
      this.getUserDetails();
      setTimeout(()=>{
        // this.getTicketsaleBanner();
        this.getBannersLists();

      },1000);
    });


    this.storage.get('username').then((value) => {
      this.username = value;
      this.getUserDetails();
      setTimeout(()=>{
        // this.getTicketsaleBanner();
        this.getBannersLists();

      },1000);
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
  getBannersLists(){
    this.artistxpSignBanner = this.httpclient.post('http://developmentapi.audiodeadline.com:3090/datalist',{source:'mediaview',condition:{"type":9,"status":1}},{});
    this.artistxpSignBanner
        .subscribe(data => {
          // console.log('my data: ', data);
          let result:any;
          result = data;
          console.log('result of getartistxpSignBanner');
          // console.log(result.res);
          // this.artistxpSignBannerList = result.res;
          for(let i in result.res){                 //for lazy-load
            this.intervalForArtistxpBanner = setInterval(()=>{
              this.artistxpSignBannerList.push(result.res[i]);
            },1500);
          }

        });
    this.blastorpassBanner = this.httpclient.post('http://developmentapi.audiodeadline.com:3090/datalist',{source:'mediaview',condition:{"type":10,"status":1}},{});
    this.artistxpSignBanner
        .subscribe(data => {
          // console.log('my data: ', data);
          let result:any;
          result = data;
          console.log('result of getartistxpSignBanner');
          // console.log(result.res);
          // this.blastorpassBannerList = result.res;
          for(let i in result.res){
            this.intervalForBlastBanner = setInterval(()=>{           //for lazy-load
              this.blastorpassBannerList.push(result.res[i]);
            },1500);
          }

        });
  }

  instagramshare(image:any){
    //alert('in insta share component instashare func');


    this.socialSharing.canShareVia('instagram').then(() => {
      // Sharing via email is possible
      //alert(555);

    }).catch(() => {
      // Sharing via email is not possible
      //alert('in can share insta catch');
    });

    this.socialSharing.shareViaInstagram('test','https://developmentapi.audiodeadline.com/nodeserver/uploads/banner/'+image).then(()=>{
      alert('in insta call');
      // this.socialSharing.shareViaEmail('Body', 'Subject', ['recipient@example.org'recipient@example.org']).then(() => {
      // Success!

    }).catch (()=>{

      alert('in share catch');
    });



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
    this.socialSharing.shareViaInstagram('instagram','https://developmentapi.audiodeadline.com/nodeserver/uploads/banner/'+image).then(()=>{
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
    this.socialSharing.shareViaTwitter('',null, 'http://devshare.artistxp.com/sharetool2.php?media_id='+image+'&username='+this.username+'&image='+image+'&submittype=signup');
    /*this.socialSharing.shareViaTwitter('test','https://developmentapi.audiodeadline.com/nodeserver/uploads/banner/'+image).then(()=>{
     alert('in insta call');
     alert('https://developmentapi.audiodeadline.com/nodeserver/uploads/banner/'+image);
     }).catch (()=>{
     alert('in share catch');
     });*/
  }

  twittersharenewwithcatchblok(image){
    this.socialSharing.shareViaTwitter('','http://devshare.artistxp.com/sharetool2.php?media_id='+image+'&username='+this.username+'&image='+image+'&submittype=signup').then(()=>{
      // alert('in then block in Twitter');
    }).catch(()=>{
      alert('in catch block in Twitter');
      // this.inappbrowser.create('https://twitter.com/intent/tweet?url=http://devshare.artistxp.com/sharetool2.php?media_id='+image+'&username='+this.username+'&image='+image,'_system');
      this.inappbrowser.create('https://twitter.com/intent/tweet?url=http%3A%2F%2Fdevshare.artistxp.com%2Fsharetool2.php%3Fmedia_id%3D'+image+'%26username%3D'+this.username+'%26image%3D'+image,'_system');
    });
  }


  facebookShare(image){
    // alert('https://developmentapi.audiodeadline.com/nodeserver/uploads/banner/'+image);
    this.socialSharing.shareViaFacebook('','','http://devshare.artistxp.com/sharetool2.php?media_id='+image+'&username='+this.username+'&image='+image+'&submittype=signup');
  }


  facebooksharewithcatchblock(image){
    this.socialSharing.shareViaFacebook('','','http://devshare.artistxp.com/sharetool2.php?media_id='+image+'&username='+this.username+'&image='+image+'&submittype=signup')
        .then(()=>{

          // alert('it is in facebook then block');

        }).catch(()=>{

      //alert('it is in facebookshare catch block');
      console.log('https://www.facebook.com/sharer.php?u=https://devshare.artistxp.com/sharetool2.php?media_id='+image+'&username='+this.username+'&image='+image+'&submittype=signup');

      this.inappbrowser.create('https://www.facebook.com/sharer.php?u=http%3A%2F%2Fdevshare.artistxp.com%2Fsharetool2.php%3Fmedia_id%3D'+image+'%26username%3D'+this.username+'%26image%3D'+image,'_system');
    });
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


  public pageScroller(){
    //scroll to page top
    //this.content.scrollToTop(100);
    //alert(this.pageTop.contentHeight);
    console.log(this.pageTop.contentHeight);
    //alert(4);
    //this.pageTop.scrollTo(0,200,1);
    let element = document.getElementById('ionc');
    element.scrollIntoView();
    //console.log(element.length);
    //this.pageTop.scrollToTop(1000);
    //this.pageTop.scrollToBottom(100);
  }
  ionViewWillLeave(){
    clearInterval(this.intervalForArtistxpBanner);
    clearInterval(this.intervalForBlastBanner);
  }

  presentAlert() {
    let alert = this.alertctrl.create({
      message: 'Copied to clipboard successfully',
      buttons: ['Okay']
    });
    alert.present();
  }
  public urlsetwithusername:any=this.graburlset+this.username;
  copyurl(urlsetwithusername){
    //alert('in copyurl fubction');
    console.log(urlsetwithusername);
    // alert(urlsetwithusername);
    this.clipboard.copy(urlsetwithusername);
    setTimeout(()=>{
      this.presentAlert();
    },1000);

  }

}
