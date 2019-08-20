import {Component} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HTTP } from '@ionic-native/http';
import { HttpClient } from '@angular/common/http';
import { SocialSharing } from '@ionic-native/social-sharing';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { VideoPlayer } from '@ionic-native/video-player';
import {DomSanitizer} from "@angular/platform-browser";
import set = Reflect.set;

declare var moment: any;
/**
 * Generated class for the AllmediaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-allmedia',
  templateUrl: 'allmedia.html',
})

export class AllmediaPage{
  public user_id: any = '';
  public username: any = '';
  public allmediadata: any;
  public resultinparse: any;
  public allmeadiadatasearchrestult: any;
  public searchArray:any=[];
  public serverSearchArray:any=[];
  public theCheckbox1=false;
  public theCheckbox2=false;
  public theCheckbox3=false;
  public allmediaarray1: any=[];
  public tempvideoarray: any=[];
  public tempmusicarray:any=[];
  public videourlforyoutube: any;
  public currentvideotypeinyoutube: any;
  public choosenvideourl: any;
  public musicval:any;
  public selectedmusic:any;
  public ismusicflag:boolean=false;
  public options2:any=[];
  public options3;
  public value2:any=[];
  public value3:any=0;
  public playstatetrending:any;
  public audioDuration:any;
  public url="https://s3.amazonaws.com/file.development.audiodeadline.com";
  /*public dinterval:any=2;*/
 /* public videoarray:any=[];*/

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public http: HTTP,
              public httpClient: HttpClient,private socialSharing: SocialSharing,public inappbrowser:InAppBrowser,
              private videoplayer:VideoPlayer, private sanitizer: DomSanitizer
             ) {
    this.storage.get('userid').then((val) => {
      this.user_id = val;
        this.allmedia();
        setTimeout(()=>{
            this.filterByMediaDefault();
        },1000);
        /*this.filterByMediaDefault();*/

    });
      this.storage.get('username').then((val) => {
          this.username = val;
          //this.allmedia();

          setTimeout(()=>{
              this.allmedia();
          },1000);
      });

     // this.value2=0;        // audio duration slider
     this.options2={
        lower:0,
        upper:200
     };
      this.value3=75;           //trending volume slider
      this.options3={
        lower:0,
        upper:100
      };

  }
   /* ngOnInit(){
    this.filterByMediaDefault();
    }*/

    // playmusic(musicval){
    //     // if ismusicflag false then music play,if ismusicflag true then music pause
    //        if(this.ismusicflag==false){
    //         alert('in playmusic----data---');
    //         console.log('in playmusic----data---');
    //         console.log(musicval);
    //         setTimeout(()=>{
    //             let myAudio:any={};
    //             myAudio=document.querySelector('#audioplayerid'+musicval._id);
    //             console.log(myAudio);
    //             this.ismusicflag=false;

    //             if (this.ismusicflag) {
    //                 console.log('in if part');
    //                 console.log(this.ismusicflag);
    //                 myAudio.pause();
    //                 this.ismusicflag = false;
    //               }else{
    //                   console.log('in else part');
    //                   console.log(this.ismusicflag);
    //                 myAudio.play();
    //                 this.ismusicflag=true;
    //                 if(myAudio!=null){
    //                     let durationofmusic=myAudio.duration.toFixed(0);
    //                     this.value2[musicval._id]=0;
    //                 }
    //                 if(myAudio!=null){
    //                     this.options2={
    //                         lower:0,
    //                         upper:myAudio.duration.toFixed(0)
    //                     }
    //                 }
    //                 if(myAudio!=null){
    //                     myAudio.volume=this.value3/100;
    //                     console.log(myAudio.volume);  
    //                 }
    //               }


    //             //console.log(myAudio.play());
    //         },2000);
            
    //        }
    //        if(this.ismusicflag==true){
    //         alert('in playmusic- for pause music---');
    //         console.log('in playmusic- for pause music---');
    //         setTimeout(()=>{
    //             let myAudio:any={};
    //             myAudio=document.querySelector('#audioplayerid'+musicval._id);
    //             console.log(myAudio);
    //             this.ismusicflag=true;

    //             if (this.ismusicflag) {
    //                 console.log('in if part for pause');
    //                 console.log(this.ismusicflag);
    //                 myAudio.pause();
    //                 this.ismusicflag = false;
    //                 let durationofmusic=myAudio.duration.toFixed(0);
    //                 if(myAudio!=null){
    //                     let durationofmusic=myAudio.duration.toFixed(0);
    //                     this.value2[musicval._id]=0;
    //                 }
    //                 if(myAudio!=null){
    //                     this.options2={
    //                         lower:0,
    //                         upper:myAudio.duration.toFixed(0)
    //                     }
    //                 }
    //                 if(myAudio!=null){
    //                     myAudio.volume=this.value3/100;
    //                     console.log(myAudio.volume);  
    //                 }
    //                 console.log(durationofmusic);
    //               }


    //             //console.log(myAudio.play());
    //         },50)
    //        } 
    //     //    if(this.musicval==true){
    //     //       console.log(this.musicval);
            
    //     //       console.log(myAudio);
    //     //       myAudio.pause();
    //     //       this.musicval=false;
    //     //    }
            
    //     }





    playmusic(val:any){
   
         if(this.ismusicflag==false){
          
           setTimeout(()=> {    //<<<---    using ()=> syntax
   
             let myAudio:any = {};
             myAudio=  document.querySelector("#audioplayerid"+val._id);
             clearInterval(this.playstatetrending);
             this.ismusicflag = false;
             this.value2[val._id] = 0;
   
             //myAudio.play();
             //this.isaudioplay=true;
   
             /* console.log($(myAudio).length);
              console.log($('#audioplayer4').length);*/
   
             if (this.ismusicflag) {
                 console.log(this.ismusicflag);
               myAudio.pause();
               clearInterval(this.playstatetrending);
               this.ismusicflag = false;
             } else {
                 console.log('it is in else block when ismusicflag is false');
                 console.log(this.ismusicflag);
               this.value2[val._id] = 0;
               clearInterval(this.playstatetrending);
               myAudio.play();
               this.options2 = {
                 lower: 0,
                 upper: myAudio.duration.toFixed(0)
               };
               myAudio.volume=this.value3/100;
               console.log(myAudio.volume);
               this.audioDuration= myAudio.duration.toFixed(0);
               console.log('audioDuration');
               console.log(this.audioDuration);
   
               this.playstatetrending = setInterval(() => {
                 //console.log('in onplay interval ....');
                 //console.log(myAudio.currentTime);
                 this.value2[val._id] = (myAudio.currentTime.toFixed(0));
                
               }, 1800);
               this.ismusicflag = true;
             }
             myAudio.onpause = function () {
                 console.log('in onpause functions....');  
               //this.playstate.clearInterval();
               clearInterval(this.playstatetrending);
             };
   
             //this.playmusic();
           }, 2000);
           // console.log('in false block !!! ');
           return;
         }
         else {
           let myAudio:any = {};
           myAudio=  document.querySelector("#audioplayerid"+val._id);
           myAudio.pause();
           this.ismusicflag = false;
           return;
         }
   
     }


        changeaudioplayertimer(val){
            let myAudio:any={};
            myAudio=document.querySelector('#audioplayerid'+val._id);
           // console.log(myAudio);
            myAudio.currentTime=this.value2[val._id];
             }

        setval1(val){
            let myAudio:any={};
            myAudio=document.querySelector('#audioplayerid'+val._id);
            //console.log(myAudio);
            myAudio.currentTime=this.value2[val._id];
        }



     convertsecstoformat(totalSeconds) {
            var hours   = Math.floor(totalSeconds / 3600);
            var minutes = Math.floor((totalSeconds - (hours * 3600)) / 60);
            var seconds = totalSeconds - (hours * 3600) - (minutes * 60);
        
            // round seconds
            seconds = Math.round(seconds * 100) / 100
        
            var result = (hours < 10 ? "0" + hours : hours);
            result += ":" + (minutes < 10 ? "0" + minutes : minutes);
            result += ":" + (seconds  < 10 ? "0" + seconds : seconds);
            return result;
          }
  allmediahttp() {
    this.http.post('http://developmentapi.audiodeadline.com:3090/getallmedia',{_id:this.user_id},{})
        .then(data => {
          console.log("data");
          console.log(data);
        })
        .catch(error => {
           //console.log('error');
           //console.log(error);

          if (error == 'cordova_not_available') {
          // alert(error);
          // alert(this.user_id);
           this.allmediadata = this.httpClient.post('http://developmentapi.audiodeadline.com:3090/getallmedia',{user_id:this.user_id},{});
           this.allmediadata
               .subscribe(data => {
                 let result: any;
                 result = data;

                // alert(JSON.stringify(result));

              if (result.status == 'error') {
                console.log('result.status');
              }
              if (result.status == 'success') {
                this.resultinparse=JSON.stringify(result.data);
                //alert(this.resultinparse);
                let resultinparse=result.data;
                console.log('resultinparse');
                console.log(resultinparse);
              }
              /*console.log('data-----');
               console.log(datarec);*/
            });


      }
    });
  }


 
    allmedia(){
        //alert(this.user_id);
        this.allmediadata = this.httpClient.post('http://developmentapi.audiodeadline.com:3090/getallmedia',{user_id:this.user_id},{});
        this.allmediadata
            .subscribe(data => {
                let result: any;
                result = data;

                //alert(JSON.stringify(result));

                if (result.status == 'success') {
                    this.resultinparse=JSON.stringify(result.data);
                    //alert(this.resultinparse);
                    this.resultinparse=result.data;
                    console.log('resultinparse');
                    console.log(this.resultinparse);
                    this.allmediaarray1=result.data;
                    /*console.log("allmediaarray");
                    console.log(this.allmediaarray);*/
                    console.log(this.resultinparse);
                    //alert(this.resultinparse);
                }else{
                    console.log('error');
                }
                /*console.log('data-----');
                 console.log(datarec);*/
            });
    }


    convertunixtotimeago(val:any){
        // console.log(val.toString().length);
        if(val.toString().length==13){
            return moment.unix(val/1000).startOf('minute').fromNow();
        }else{
            return moment.unix(val).startOf('minute').fromNow();
        }
    }

    facebooksharewithcatchblock(type,item){
        if(type=='picture'){
        // alert(type);
        // alert(JSON.stringify(item));
         //alert(item.posts.user_id);
         //alert(item.posts_id);
         //alert(item.posts.image_pic);
         //alert('shareviafacebook-----');
         //alert('http://devshare.artistxp.com/sharetools.php?type=p&userid='+item.posts.user_id+'&itemid='+item.posts._id);
           // this.socialSharing.shareViaFacebook('','','http://devshare.artistxp.com/sharetools.php?type=p&userid='+item.user_id+'&itemid='+item._id)
            this.socialSharing.shareViaFacebook('','','http://devshare.artistxp.com/sharetools.php?type=p&userid='+item.posts.user_id+'&itemid='+item.posts._id)
                .then(()=>{

                    //alert('it is in facebook then block for picture');
                    console.log('it is in facebook then block for picture');

                }).catch(()=>{

                //alert('it is in facebookshare catch block for picture');
     console.log('https://www.facebook.com/sharer.php?u=http://devshare.artistxp.com/sharetools.php?type=p&userid='+item.posts.user_id+'&itemid='+item.posts._id);
          /*this.inappbrowser.create('https://www.facebook.com/sharer.php?u=http://devshare.artistxp.com/sharetools.php?type=p&userid='+item.posts.user_id+'&itemid='+item.posts._id,'_system');*/

                this.inappbrowser.create('https://www.facebook.com/sharer.php?u='+encodeURIComponent('http://devshare.artistxp.com/sharetools.php?type=p&userid='+item.posts.user_id+'&itemid='+item.posts._id),'_system');

                /*encodeURIComponent function is required for encripted the url example--https://www.facebook.com/sharer.php?u=http%3A%2F%2Fdevshare.artistxp.com%2Fsharetools.php%3Ftype%3Dp%26userid%3D5d147c4ced9b65bd07463be8%26itemid%3D5d28e3a4ba2b12cc2e8c6c3f*/


            });

        }
        if(type=='video'){
          //  alert(type);
          //  alert(JSON.stringify(item));
         //   alert(item.posts.user_id);
            //alert(item.posts_id);
            this.socialSharing.shareViaFacebook('','','http://devshare.artistxp.com/sharetools.php?type=v&userid='+item.posts.user_id+'&itemid='+item.posts._id)
                .then(()=>{
                console.log('it is in facebook then block for video');

                 //   alert('it is in facebook then block for video');

                }).catch(()=>{

                console.log('it is in facebookshare catch block for video');
                /*console.log('https://www.facebook.com/sharer.php?u=http://devshare.artistxp.com/sharetools.php?type=p&userid='+item.posts.user_id+'&itemid='+item.posts._id,+'&submittype=signup');*/


               /* this.inappbrowser.create('https://www.facebook.com/sharer.php?u=http://devshare.artistxp.com/sharetools.php?type=v&userid='+item.posts.user_id+'&itemid='+item.posts._id,'_system');*/

                this.inappbrowser.create('https://www.facebook.com/sharer.php?u='+encodeURIComponent('http://devshare.artistxp.com/sharetools.php?type=v&userid='+item.posts.user_id+'&itemid='+item.posts._id),'_system');



            });
        }
        if(type=='music'){
           // alert(type);
           // alert(JSON.stringify(item));
           // alert(item.posts.user_id);
            //alert(item.posts_id);
            this.socialSharing.shareViaFacebook('','','http://devshare.artistxp.com/sharetools.php?type=a&userid='+item.posts.user_id+'&itemid='+item.posts._id)
                .then(()=>{

                    console.log('it is in facebook then block for audio');

                }).catch(()=>{

                console.log('it is in facebookshare catch block for audio');
                /*console.log('https://www.facebook.com/sharer.php?u=http://devshare.artistxp.com/sharetools.php?type=p&userid='+item.posts.user_id+'&itemid='+item.posts._id,+'&submittype=signup');*/


               /* this.inappbrowser.create('https://www.facebook.com/sharer.php?u=http://devshare.artistxp.com/sharetools.php?type=a&userid='+item.posts.user_id+'&itemid='+item.posts._id,'_system');*/
                this.inappbrowser.create('https://www.facebook.com/sharer.php?u='+encodeURIComponent('http://devshare.artistxp.com/sharetools.php?type=m&userid='+item.posts.user_id+'&itemid='+item.posts._id),'_system');

            });
        }

    }



    /* this.socialSharing.shareViaTwitter('', 'http://devshare.artistxp.com/sharetools.php?type=p&userid='+item.posts.user_id+'&itemid='+item.posts._id +'&image='+ item.posts.image_pic)* importent*/
    twittersharenewwithcatchblok(type,item){
       // alert(type);
        if(type=='picture') {
            alert('http://devshare.artistxp.com/sharetools.php?type=p&userid='+item.posts.user_id+'&itemid='+item.posts._id);
            this.inappbrowser.create('https://twitter.com/intent/tweet?url='+encodeURIComponent('http://devshare.artistxp.com/sharetools.php?type=p&userid='+item.posts.user_id+'&itemid='+item.posts._id),'_system');
            /*when picture share via app the execute then block*/
  /*          alert('http://devshare.artistxp.com/sharetools.php?type=p&userid='+item.posts.user_id+'&itemid='+item.posts._id);/!*+'&image='+ item.posts.image_pic*!/
            this.socialSharing.shareViaTwitter('','http://devshare.artistxp.com/sharetools.php?type=p&userid='+item.posts.user_id+'&itemid='+item.posts._id).then(() => {

                alert('in then block in Twitter in picture');
               // console.log('in then block in Twitter in picture');
            }).catch(() => {
                alert('in catch block in Twitter in picture');
                this.inappbrowser.create('https://twitter.com/intent/tweet?url='+encodeURIComponent('http://devshare.artistxp.com/sharetools.php?type=p&userid='+item.posts.user_id+'&itemid='+item.posts._id),'_system');


            });*/
        }
        if(type=='video') {
            alert('http://devshare.artistxp.com/sharetools.php?type=v&userid='+item.posts.user_id+'&itemid='+item.posts._id);
            this.inappbrowser.create('https://twitter.com/intent/tweet?url='+encodeURIComponent('http://devshare.artistxp.com/sharetools.php?type=v&userid='+item.posts.user_id+'&itemid='+item.posts._id),'_system');
  /*          this.socialSharing.shareViaTwitter('','http://devshare.artistxp.com/sharetools.php?type=v&userid='+item.user_id+'&itemid='+item._id+'&image='+ item.posts.image_pic).then(() => {
                /!* this.generalshareurl = 'https://twitter.com/intent/tweet?url='+encodeURIComponent('http://devshare.artistxp.com/sharetools.php?type=m&userid='+item.user_id+'&itemid='+item._id);*!/

                //alert('in then block in Twitter in video');
                console.log('in then block in Twitter in video');
            }).catch(() => {
               // alert('in catch block in Twitter in video');
                this.inappbrowser.create('https://twitter.com/intent/tweet?url='+encodeURIComponent('http://devshare.artistxp.com/sharetools.php?type=v&userid='+item.posts.user_id+'&itemid='+item.posts._id),'_system');

            });*/
        }
        if(type=='music') {
            alert('http://devshare.artistxp.com/sharetools.php?type=m&userid='+item.posts.user_id+'&itemid='+item.posts._id);
            this.inappbrowser.create('https://twitter.com/intent/tweet?url='+encodeURIComponent('http://devshare.artistxp.com/sharetools.php?type=m&userid='+item.posts.user_id+'&itemid='+item.posts._id),'_system');
        /*    this.socialSharing.shareViaTwitter('','http://devshare.artistxp.com/sharetools.php?type=a&userid='+item.user_id+'&itemid='+item._id+'&image='+ item.posts.image_pic).then(() => {
                /!* this.generalshareurl = 'https://twitter.com/intent/tweet?url='+encodeURIComponent('http://devshare.artistxp.com/sharetools.php?type=m&userid='+item.user_id+'&itemid='+item._id);*!/

              //  alert('in then block in Twitter in audio');
              console.log('in then block in Twitter in audio');
            }).catch(() => {
               // alert('in catch block in Twitter in audio');
                this.inappbrowser.create('https://twitter.com/intent/tweet?url='+encodeURIComponent('http://devshare.artistxp.com/sharetools.php?type=m&userid='+item.posts.user_id+'&itemid='+item.posts._id),'_system');

            });*/
        }

    }

    linkedinsharewithcatchblock(type,item){
       // alert(type);
        if(type=='picture') {

          /*  this.inappbrowser.create('https://www.linkedin.com/shareArticle?url='+encodeURIComponent('http://devshare.artistxp.com/sharetools.php?type=p&userid='+item.posts.user_id+'&itemid='+item.posts._id),'_system');*/
            this.inappbrowser.create('https://www.linkedin.com/shareArticle?url='+encodeURIComponent('http://devshare.artistxp.com/sharetools.php?type=p&userid='+item.posts.user_id+'&itemid='+item.posts._id),'_system');



           /* this.inappbrowser.create('https://www.linkedin.com/shareArticle?url=http%3A%2F%2Fdevshare.artistxp.com%2Fsharetool2.php%3Fmedia_id%3D'+image+'%26username%3D'+this.username+'%26image%3D'+image+'%26submittype%3Dsignup','_system');*/

        }
        if(type=='video') {

            /*  this.inappbrowser.create('https://www.linkedin.com/shareArticle?url='+encodeURIComponent('http://devshare.artistxp.com/sharetools.php?type=p&userid='+item.posts.user_id+'&itemid='+item.posts._id),'_system');*/
            this.inappbrowser.create('https://www.linkedin.com/shareArticle?url='+encodeURIComponent('http://devshare.artistxp.com/sharetools.php?type=v&userid='+item.posts.user_id+'&itemid='+item.posts._id),'_system');

            /* this.inappbrowser.create('https://www.linkedin.com/shareArticle?url=http%3A%2F%2Fdevshare.artistxp.com%2Fsharetool2.php%3Fmedia_id%3D'+image+'%26username%3D'+this.username+'%26image%3D'+image+'%26submittype%3Dsignup','_system');*/

        }
        if(type=='music') {

            /*  this.inappbrowser.create('https://www.linkedin.com/shareArticle?url='+encodeURIComponent('http://devshare.artistxp.com/sharetools.php?type=p&userid='+item.posts.user_id+'&itemid='+item.posts._id),'_system');*/
            this.inappbrowser.create('https://www.linkedin.com/shareArticle?url='+encodeURIComponent('http://devshare.artistxp.com/sharetools.php?type=m&userid='+item.posts.user_id+'&itemid='+item.posts._id),'_system');

            /* this.inappbrowser.create('https://www.linkedin.com/shareArticle?url=http%3A%2F%2Fdevshare.artistxp.com%2Fsharetool2.php%3Fmedia_id%3D'+image+'%26username%3D'+this.username+'%26image%3D'+image+'%26submittype%3Dsignup','_system');*/

        }
    }

    tumblrsharingwithcatchblock(type,item){
        //alert(type);
        if(type=='picture'){
            this.inappbrowser.create('https://www.tumblr.com/widgets/share/tool/preview?shareSource=legacy&canonicalUrl='+encodeURIComponent('http://devshare.artistxp.com/sharetools.php?type=p&userid='+item.posts.user_id+'&itemid='+item.posts._id),'_system');
            /*'https://www.tumblr.com/widgets/share/tool/preview?shareSource=legacy&canonicalUrl='+encodeURIComponent('http://devshare.artistxp.com/sharetools.php?type=p&userid='+item.user_id+'&itemid='+item._id)*/
        }
        if(type=='video'){
            this.inappbrowser.create('https://www.tumblr.com/widgets/share/tool/preview?shareSource=legacy&canonicalUrl='+encodeURIComponent('http://devshare.artistxp.com/sharetools.php?type=v&userid='+item.posts.user_id+'&itemid='+item.posts._id),'_system');
            /*'https://www.tumblr.com/widgets/share/tool/preview?shareSource=legacy&canonicalUrl='+encodeURIComponent('http://devshare.artistxp.com/sharetools.php?type=p&userid='+item.user_id+'&itemid='+item._id)*/
        }
        if(type=='music'){
            this.inappbrowser.create('https://www.tumblr.com/widgets/share/tool/preview?shareSource=legacy&canonicalUrl='+encodeURIComponent('http://devshare.artistxp.com/sharetools.php?type=m&userid='+item.posts.user_id+'&itemid='+item.posts._id),'_system');
            /*'https://www.tumblr.com/widgets/share/tool/preview?shareSource=legacy&canonicalUrl='+encodeURIComponent('http://devshare.artistxp.com/sharetools.php?type=p&userid='+item.user_id+'&itemid='+item._id)*/
        }
    }


  ionViewDidLoad() {
    console.log('ionViewDidLoad AllmediaPage');
  }
    filterByMedia(){
        alert('in all media hit the filterByMedia function');
        let tvarr=[];
        this.searchArray = [];
        console.log('thecheckbox value----');
        console.log(this.theCheckbox1);
        console.log(this.theCheckbox2);
        console.log(this.theCheckbox3);
        if(this.theCheckbox1 == true){
            this.searchArray.push('allmediadata_music');

            let tvar = this.serverSearchArray.filter(function (val) {
                return val.post_type === "music";
            });
            tvarr= tvarr.concat(tvar);
            console.log(tvarr);
            console.log('searcharray');
            console.log(this.searchArray);
        }
        if(this.theCheckbox2 == true){
            this.searchArray.push('allmediadata_video');
            let tvar = this.serverSearchArray.filter(function (val) {   /*val is the whole object*/
               /* console.log('val-----------');
                console.log(val);*/
                return val.post_type === "video";  /*it returns the value whose post_type is video*/
            });
            tvarr=tvarr.concat(tvar);
            console.log(tvarr);
        }
        if(this.theCheckbox3 == true){
            this.searchArray.push('allmediadata_picture');
            let tvar = this.serverSearchArray.filter(function (val) {
                return val.post_type === "picture";
            });
            tvarr=tvarr.concat(tvar);
            console.log(tvarr);
        }
        if(this.searchArray.length>0){

            this.resultinparse=tvarr;
            this.resultinparse.sort(this.dynamicSort("-posts_id"));

            console.log('resultinparse after filter -- ');
            console.log(this.resultinparse);
           /* this.dinterval+=2;*/
        }else{
            this.resultinparse=this.allmediaarray1;
            this.resultinparse.sort(this.dynamicSort("-posts_id"));
            // this.dinterval+=2;
        }

    }
    filterByMediaDefault(){
    console.log('in filterbymediadefault----');
    this.searchArray=[];
    this.searchArray.push('allmediadata_music');
    this.searchArray.push('allmediadata_video');
    this.searchArray.push('allmediadata_picture');
    if(this.searchArray.length>0){
        this.allmeadiadatasearchrestult=this.httpClient.post('https://developmentapi.audiodeadline.com:6090/allmediadatasearch',{"user_id":this.user_id,"searcharr":this.searchArray});

        this.allmeadiadatasearchrestult.subscribe(res=>{
            console.log(res);
            let result:any;
            result=res;
            console.log('result in filter media');
            console.log(result);
            this.serverSearchArray=result.items;/*serversearch array is hold the all value  of music video and picture*/
            alert('print serversearcharray');
            console.log(this.serverSearchArray);
            this.tempvideoarray=result.items;
            // for music take a variable  and assign the whole data comes from server i.e video,music and pictures 
            this.tempmusicarray=result.items;  

            for(let i in this.serverSearchArray){

               console.log('server search data---------------------------');
               console.log(this.serverSearchArray);
                if(this.serverSearchArray[i].posts.type=='vimeo'){

               console.log('serversearcharray of single data----------------------------------');
                    console.log(this.serverSearchArray[i]);
                    let tempvurl=this.serverSearchArray[i].posts.videoUrl;
                    console.log('tempvurl');
                    // console.log(tempvurl);
                    let vimeourl = tempvurl.split('/');
                    console.log(vimeourl);
                    let videoid = vimeourl[vimeourl.length - 1];
                    console.log('videoid');
                    console.log(videoid);
                    // console.log('videoid');
                    // console.log(videoid);
                    this.tempvideoarray[i].posts.vurl=this.sanitizer.bypassSecurityTrustResourceUrl("https://player.vimeo.com/video/" + videoid);
                    console.log(this.tempvideoarray[i].posts.vurl);
                }

                  if(this.serverSearchArray[i].posts.type=='youtube'){
                    setTimeout(()=>{
                        let tempvurl=this.serverSearchArray[i].posts.videoUrl;
                        let videourl=tempvurl.split('v=');
                        console.log(videourl);
                         let videoid=videourl[videourl.length - 1];
                         this.videourlforyoutube=videoid;
                         console.log(this.videourlforyoutube);
                         this.currentvideotypeinyoutube='youtube';
          /*this.tempvideoarray[i].posts.vurl=this.sanitizer.bypassSecurityTrustResourceUrl(this.serverSearchArray[i].posts.videoUrl);*/
          // this.tempvideoarray[i].posts.vurl=this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/watch?'+'/'+this.videourlforyoutube);
          this.tempvideoarray[i].posts.vurl=this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/"+videoid+"?enablejsapi=1&widgetid=1");/*in youtube pass https://www.youtube.com ,embed, videoid hold the dynamic value of youtube videos value and pass  ?enablejsapi=1&widgetid=1 value*/

          /*videourlforyoutube*/
         // let url1 =this.serverSearchArray[i].videoUrl.replace('watch?v=', 'embed/');

          //this.choosenvideourl = this.sanitizer.bypassSecurityTrustResourceUrl(url1);
                         },50);
                }

// console.log('go to music block with whole data.................');
// console.log(this.serverSearchArray);
  if(this.serverSearchArray[i].post_type=='music'){
                // console.log('get music.........');
                // console.log(this.serverSearchArray[i]);
                this.tempmusicarray[i].posts.musicurl=
                this.sanitizer.bypassSecurityTrustResourceUrl
                ('https://s3.amazonaws.com/file.development.audiodeadline.com/'+'audio/'
                +this.tempmusicarray[i].posts.user_id +'/'+this.tempmusicarray[i].posts.music);
                console.log('musicurl add in posts');
                console.log(this.tempmusicarray[i].posts.musicurl);

                setTimeout(()=> {   
                    let myAudio:any = {};
                    if(myAudio!=null){
                        myAudio=  document.querySelector("#audioplayer4"+this.tempmusicarray[0]._id);
                    }
                      if(myAudio!=null)this.audioDuration = myAudio.duration.toFixed(0);
                      this.value2[this.tempmusicarray[0]._id]  = 0;
                    if(myAudio!=null)
                    {
                        this.options2= {
                      lower: 0,
                      upper: myAudio.duration.toFixed(0)
                    };
                }
    
                    if(myAudio!=null){
                        myAudio.volume=this.value3/100;
                    } 
                    
                  }, 1000);

                }

            
            }
            console.log('this.tempvideoarray');
            console.log(this.tempvideoarray);

        })
    }else{
        this.resultinparse=this.allmediaarray1;
        console.log('searchArray is empty');
    }
    }

    dynamicSort(property) {
        var sortOrder = 1;
        if(property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1);
        }
        return function (a,b) {
            var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            return result * sortOrder;
        }
    }
    // musicurl

  

}


