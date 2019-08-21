import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HTTP } from '@ionic-native/http';
import { HttpClient } from '@angular/common/http';
import { SocialSharing } from '@ionic-native/social-sharing';
import { InAppBrowser } from '@ionic-native/in-app-browser'
import {DomSanitizer} from "@angular/platform-browser";
declare var moment:any;

/**
 * Generated class for the TrendingmediaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-trendingmedia',
  templateUrl: 'trendingmedia.html',
})
export class TrendingmediaPage {
  public user_id: any = '';
  public trendingmediadata: any;
  public resultoftrendingmediadata: any;
  public trandingmediadatasearchrestult:any;
  public allmediadata: any;
    public searchArray:any=[];
    public serverSearchArray:any=[];
    public theCheckbox1=false;
    public theCheckbox2=false;
    public theCheckbox3=false;
    public trendingmediaarray1: any=[];
    public tempvideoarray: any=[];
  constructor(public navCtrl: NavController, public navParams: NavParams,public storage: Storage, public http: HTTP, public httpClient: HttpClient,private socialSharing: SocialSharing,public inappbrowser:InAppBrowser,public sanitizer: DomSanitizer ) {
    this.storage.get('userid').then((val) => {
      this.user_id = val;
        this.gettrendingmediadata();
        this.filterByMediaDefault();
      /*setTimeout(()=>{
        //this.allmedia();
        this.gettrendingmediadata();
      },1000);*/
    });
  }
  gettrendingmediadata(){
   // alert(this.user_id);
    this.trendingmediadata = this.httpClient.post('http://developmentapi.audiodeadline.com:3090/trendingdata',{user_id:this.user_id},{});
    this.trendingmediadata
        .subscribe(data=>{
          let result: any;
          result = data;
         // alert(JSON.stringify(result));
          if(result.status=='success'){
          this.resultoftrendingmediadata=result.items;
          console.log('resultoftrendingmediadata------------');
            console.log(this.resultoftrendingmediadata);
           // alert(this.resultoftrendingmediadata);
          }
          else{
            console.log('error');
          }
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
    filterByMedia(){
      alert('in trending media hit the filterByMedia function');
        let tvarr=[];
        this.searchArray = [];
        console.log('thecheckbox value----');
        console.log(this.theCheckbox1);
        console.log(this.theCheckbox2);
        console.log(this.theCheckbox3);
        if(this.theCheckbox1 == true){
            this.searchArray.push('trendingdata_music');

            let tvar = this.serverSearchArray.filter(function (val) {
                return val.post_type === "music";
            });
            tvarr= tvarr.concat(tvar);
            console.log(tvarr);
        }
        if(this.theCheckbox2 == true){
            this.searchArray.push('trendingdata_video');
            let tvar = this.serverSearchArray.filter(function (val) {   /*val is the whole object*/
                /* console.log('val-----------');
                 console.log(val);*/
                return val.post_type === "video";  /*it returns the value whose post_type is video*/
            });
            tvarr=tvarr.concat(tvar);
            console.log(tvarr);
        }
        if(this.theCheckbox3 == true){
            this.searchArray.push('trendingdata_picture');
            let tvar = this.serverSearchArray.filter(function (val) {
                return val.post_type === "picture";
            });
            tvarr=tvarr.concat(tvar);
            console.log(tvarr);
        }
        if(this.searchArray.length>0){

            this.resultoftrendingmediadata=tvarr;
            this.resultoftrendingmediadata.sort(this.dynamicSort("-posts_id"));

            console.log('tvarr -- ');
            console.log(this.resultoftrendingmediadata);
            /* this.dinterval+=2;*/
        }else{
            this.resultoftrendingmediadata=this.trendingmediaarray1;
            this.resultoftrendingmediadata.sort(this.dynamicSort("-posts_id"));
            // this.dinterval+=2;
        }

    }
    filterByMediaDefault(){
        console.log('in filterbymediadefault');
        console.log(this.user_id);
        this.searchArray=[];
        this.searchArray.push('trendingdata_music');
        this.searchArray.push('trendingdata_video');
        this.searchArray.push('trendingdata_picture');
        if(this.searchArray.length>0){
            this.trandingmediadatasearchrestult=this.httpClient.post('https://developmentapi.audiodeadline.com:6090/trendingdatasearch',{"user_id":this.user_id,"searcharr":this.searchArray});

            this.trandingmediadatasearchrestult.subscribe(res=>{
                console.log(res);
                let result:any;
                result=res;
                console.log('result in filter media');
                console.log(result);
                this.serverSearchArray=result.items;/*serversearch array is hold the all value  of music video and picture*/
                console.log(this.serverSearchArray);
                this.tempvideoarray=result.items;
                for(let i in this.serverSearchArray){
                    if(this.serverSearchArray[i].posts.type=='vimeo'){
                        console.log('get vimeo video');
                        let tempvurl=this.serverSearchArray[i].posts.videoUrl;
                        console.log(tempvurl);
                        let vimeourl=tempvurl.split('/');
                        console.log(vimeourl);
                        let videoid= vimeourl[vimeourl.length - 1];
                        console.log(videoid);
                        this.tempvideoarray[i].posts.vurl=this.sanitizer.bypassSecurityTrustResourceUrl("https://player.vimeo.com/video/"+videoid);
                        console.log(this.tempvideoarray[i].posts.vurl);
                    }
                    if(this.serverSearchArray[i].posts.type=='youtube'){
                        setTimeout(()=>{
                            let tempurlforyoutube=this.serverSearchArray[i].posts.videoUrl;
                            console.log(tempurlforyoutube);
                            let youtubeurl=tempurlforyoutube.split('v=');
                            console.log(youtubeurl);
                            let youtubevideoid=youtubeurl[youtubeurl.length-1];
                            console.log(youtubevideoid);
                            this.tempvideoarray[i].posts.vurl=this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/'+youtubevideoid+'?enablejsapi=1&widgetid=1');
                            console.log(this.tempvideoarray[i].posts.vurl);

                            /*https://www.youtube.com/embed/PRKjflFFRPE?enablejsapi=1&origin=https%3A%2F%2Fdevelopment.artistxp.com&widgetid=1*/
                        },50);


                    }

                }
            })
        }else{
            this.resultoftrendingmediadata=this.trendingmediaarray1;
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

    facebooksharewithcatchblock(type,item){
        if(type=='picture'){
            //alert(type);
            //alert(JSON.stringify(item));
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
           // alert(JSON.stringify(item));
            //alert(item.posts.user_id);
            //alert(item.posts_id);
            this.socialSharing.shareViaFacebook('','','http://devshare.artistxp.com/sharetools.php?type=v&userid='+item.posts.user_id+'&itemid='+item.posts._id)
                .then(()=>{

                    //alert('it is in facebook then block for video');
                    console.log('it is in facebook then block for video');

                }).catch(()=>{

                //alert('it is in facebookshare catch block for video');
                console.log('it is in facebookshare catch block for video');
                /*console.log('https://www.facebook.com/sharer.php?u=http://devshare.artistxp.com/sharetools.php?type=p&userid='+item.posts.user_id+'&itemid='+item.posts._id,+'&submittype=signup');*/


                /* this.inappbrowser.create('https://www.facebook.com/sharer.php?u=http://devshare.artistxp.com/sharetools.php?type=v&userid='+item.posts.user_id+'&itemid='+item.posts._id,'_system');*/

                this.inappbrowser.create('https://www.facebook.com/sharer.php?u='+encodeURIComponent('http://devshare.artistxp.com/sharetools.php?type=v&userid='+item.posts.user_id+'&itemid='+item.posts._id),'_system');



            });
        }
        if(type=='music'){
            //alert(type);
            //alert(JSON.stringify(item));
            //alert(item.posts.user_id);
            //alert(item.posts_id);
            this.socialSharing.shareViaFacebook('','','http://devshare.artistxp.com/sharetools.php?type=a&userid='+item.posts.user_id+'&itemid='+item.posts._id)
                .then(()=>{

                   // alert('it is in facebook then block for audio');
                    console.log('it is in facebook then block for audio');

                }).catch(()=>{

                //alert('it is in facebookshare catch block for audio');
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
            /*this.socialSharing.shareViaTwitter('','http://devshare.artistxp.com/sharetools.php?type=p&userid='+item.user_id+'&itemid='+item._id+'&image='+ item.posts.image_pic).then(() => {

               // alert('in then block in Twitter in picture');
               console.log('in then block in Twitter in picture');
            }).catch(() => {
                //alert('in catch block in Twitter in picture');
                this.inappbrowser.create('https://twitter.com/intent/tweet?url='+encodeURIComponent('http://devshare.artistxp.com/sharetools.php?type=p&userid='+item.posts.user_id+'&itemid='+item.posts._id),'_system');

            });*/
        }
        if(type=='video') {
            alert('http://devshare.artistxp.com/sharetools.php?type=v&userid='+item.posts.user_id+'&itemid='+item.posts._id);
            this.inappbrowser.create('https://twitter.com/intent/tweet?url='+encodeURIComponent('http://devshare.artistxp.com/sharetools.php?type=v&userid='+item.posts.user_id+'&itemid='+item.posts._id),'_system');
     /*       this.socialSharing.shareViaTwitter('','http://devshare.artistxp.com/sharetools.php?type=v&userid='+item.user_id+'&itemid='+item._id+'&image='+ item.posts.image_pic).then(() => {


                //alert('in then block in Twitter in video');
                console.log('in then block in Twitter in video');
            }).catch(() => {
                //alert('in catch block in Twitter in video');
                this.inappbrowser.create('https://twitter.com/intent/tweet?url='+encodeURIComponent('http://devshare.artistxp.com/sharetools.php?type=v&userid='+item.posts.user_id+'&itemid='+item.posts._id),'_system');

            });*/
        }
        if(type=='music') {
          alert('http://devshare.artistxp.com/sharetools.php?type=m&userid='+item.posts.user_id+'&itemid='+item.posts._id);
            this.inappbrowser.create('https://twitter.com/intent/tweet?url='+encodeURIComponent('http://devshare.artistxp.com/sharetools.php?type=m&userid='+item.posts.user_id+'&itemid='+item.posts._id),'_system');
           /* this.socialSharing.shareViaTwitter('','http://devshare.artistxp.com/sharetools.php?type=a&userid='+item.user_id+'&itemid='+item._id+'&image='+ item.posts.image_pic).then(() => {
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
    console.log('ionViewDidLoad TrendingmediaPage');
  }

}
