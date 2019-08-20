import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HTTP } from '@ionic-native/http';
import { HttpClient } from '@angular/common/http'
/**
 * Generated class for the ArtistsearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-artistsearch',
  templateUrl: 'artistsearch.html',
})
export class ArtistsearchPage {
  public user_id: any = '';
  public artistsearchdata: any;
 // public artistdata: any;
  public resultofartistdata: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public storage: Storage, public http: HTTP,
  public httpClient: HttpClient) {
    this.storage.get('userid').then((val) => {
      this.user_id = val;
        this.gettrendingartistdatainartistsearch();

      /*setTimeout(()=>{
        //this.allmedia();
        this.gettrendingartistdatainartistsearch();
      },1000);*/
    });


  }
  gettrendingartistdatainartistsearchhttpandhttpclient(){
    this.http.post('http://developmentapi.audiodeadline.com:3090/gettrendingartistdata',{user_id:this.user_id},{})
        .then(data => {
          console.log("data");
          console.log(data);
          let result:any;
          result=data;
            if (result.status=='success') {
                this.resultofartistdata=result.data;
                console.log(this.resultofartistdata);
               // alert(this.resultofartistdata);
            }else{
                console.log('error');
            }
        })
        .catch(error => {
          //console.log('error');
          //console.log(error);

          if (error == 'cordova_not_available') {
            //alert(error);
            //alert(this.user_id);
            this.artistsearchdata = this.httpClient.post('http://developmentapi.audiodeadline.com:3090/gettrendingartistdata',{user_id:this.user_id},{});
            this.artistsearchdata
                .subscribe(data => {
                  let result: any;
                  result = data;

                  //alert(JSON.stringify(result));

                    if (result.status == 'success') {
                        let resultinparse=JSON.stringify(result.data);
                        //alert(resultinparse);
                        console.log(resultinparse);
                        this.resultofartistdata=result.data;
                        console.log(this.resultofartistdata);
                       // alert(this.resultofartistdata);
                    }else{
                        console.log('error');
                    }
                  /*console.log('data-----');
                   console.log(datarec);*/
                });


          }
        });
  }
    gettrendingartistdatainartistsearch(){
       /* alert(this.user_id);*/
        this.artistsearchdata = this.httpClient.post('http://developmentapi.audiodeadline.com:3090/gettrendingartistdata',{user_id:this.user_id},{});
        this.artistsearchdata
            .subscribe(data => {
                let result: any;
                result = data;

                /*alert(JSON.stringify(result));*/

                if (result.status == 'success') {
                    let resultinparse=JSON.stringify(result.data);
                    /*alert(resultinparse);*/
                    console.log(resultinparse);
                    this.resultofartistdata=result.data;
                    console.log(this.resultofartistdata);
                    /*alert(this.resultofartistdata);*/
                }else{
                    console.log('error');
                }
                /*console.log('data-----');
                 console.log(datarec);*/
            });
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ArtistsearchPage');
  }

}
