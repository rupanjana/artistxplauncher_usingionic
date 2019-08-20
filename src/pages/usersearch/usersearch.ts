import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HTTP } from '@ionic-native/http';
import { HttpClient } from '@angular/common/http';
declare var moment: any;
/**
 * Generated class for the UsersearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-usersearch',
  templateUrl: 'usersearch.html',
})
export class UsersearchPage {
  public user_id: any = '';
  public usersearchdata: any;
  // public artistdata: any;
  public resultofuserdata: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public storage: Storage, public http: HTTP, public httpClient: HttpClient) {
    this.storage.get('userid').then((val) => {
      this.user_id = val;
        this.gettrendingartistdatainusersearch();

      /*setTimeout(()=>{
        //this.allmedia();
        this.gettrendingartistdatainusersearch();
      },1000);*/
    });
  }

  gettrendingartistdatainusersearchhttp(){
    this.http.post('http://developmentapi.audiodeadline.com:3090/gettrendinguserdata',{user_id:this.user_id},{})
        .then(data => {
            console.log("data");
            console.log(data);
            let dataval:any;
            dataval=data;

            if (dataval.status=='success') {
                this.resultofuserdata=dataval.data;/* parse data is shown object object i.e raw data */
                console.log(this.resultofuserdata);
            }else{
                console.log('error');
            }
        })
        .catch(error => {
            //console.log('error');
            //console.log(error);

            if (error == 'cordova_not_available') {
                //alert(error);
               // alert(this.user_id);
                this.usersearchdata = this.httpClient.post('http://developmentapi.audiodeadline.com:3090/gettrendinguserdata',{user_id:this.user_id},{});
                this.usersearchdata
                    .subscribe(data => {
                        let result: any;
                        result = data;

                        alert(JSON.stringify(result));

                        if (result.status == 'error') {
                            console.log('result.status');
                        }
                        if (result.status == 'success') {
                            let resultinparse=JSON.stringify(result.data);
                            //alert(resultinparse);
                            console.log(resultinparse);
                            this.resultofuserdata=result.data;
                            /*for(let i in this.resultofuserdata){
                                this.convertunixtotimeago(this.resultofuserdata[i]);
                            }*/

                            console.log(this.resultofuserdata);
                            //alert(this.resultofuserdata);
                        }
                        /*console.log('data-----');
                         console.log(datarec);*/
                    });


            }
        });
  }
    gettrendingartistdatainusersearch(){
        alert(this.user_id);
        this.usersearchdata = this.httpClient.post('http://developmentapi.audiodeadline.com:3090/gettrendinguserdata',{user_id:this.user_id},{});
        this.usersearchdata
            .subscribe(data => {
                let result: any;
                result = data;

               // alert(JSON.stringify(result));

                if (result.status == 'success') {
                    let resultinparse=JSON.stringify(result.data);
                  //  alert(resultinparse);
                    console.log(resultinparse);
                    this.resultofuserdata=result.data;
                    /*for(let i in this.resultofuserdata){
                     this.convertunixtotimeago(this.resultofuserdata[i]);
                     }*/

                    console.log(this.resultofuserdata);
                    //alert(this.resultofuserdata);
                }else{
                    console.log('error block');
                }
                /*console.log('data-----');
                 console.log(datarec);*/
            });
    }
/*  convertunixtotimeago(val:any){
     console.log(val.added_time.toString().length);
    if(val.added_time.toString().length==13){
      val.agoTime =  moment.unix(val.added_time/1000).startOf('minute').fromNow();
    }else{
        val.agoTime = moment.unix(val.added_time).startOf('minute').fromNow();
    }
  }*/
    convertunixtotimeago(val:any){
        // console.log(val.toString().length);
        if(val.toString().length==13){
            return moment.unix(val/1000).startOf('minute').fromNow();
        }else{
            return moment.unix(val).startOf('minute').fromNow();
        }
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UsersearchPage');
  }

}
