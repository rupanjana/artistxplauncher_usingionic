import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HTTP } from '@ionic-native/http';
import { HttpClient } from '@angular/common/http'

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
export class AllmediaPage {
  public user_id: any = '';
  public allmediadata: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public http: HTTP,
              public httpClient: HttpClient) {
    this.storage.get('userid').then((val) => {
      this.user_id = val;
      //this.allmedia();

       setTimeout(()=>{
       //this.allmedia();
       this.allmedia();
       },1000);
    });
  }

  allmedia() {
    this.http.post('http://developmentapi.audiodeadline.com:3090/getallmedia',{_id:this.user_id})
        .then(data => {
          console.log("data");
          console.log(data);
        })
        .catch(error => {
           //console.log('error');
           //console.log(error);

          if (error == 'cordova_not_available') {
           alert(error);
           alert(this.user_id);
           this.allmediadata = this.httpClient.post('http://developmentapi.audiodeadline.com:3090/getallmedia',{user_id:this.user_id},{});
           this.allmediadata
               .subscribe(data => {
                 let result: any;
                 result = data;

                 alert(JSON.stringify(result));

              if (result.status == 'error') {
                console.log('result.status');
              }
              if (result.status == 'success') {
                let resultinparse=JSON.stringify(result.data);
                alert(resultinparse);
                let resultinparse=JSON.parse(resultinparse);
                console.log(resultinparse[0]);
              }
              /*console.log('data-----');
               console.log(datarec);*/
            });


      }
    });
  }




  ionViewDidLoad() {
    console.log('ionViewDidLoad AllmediaPage');
  }
}


