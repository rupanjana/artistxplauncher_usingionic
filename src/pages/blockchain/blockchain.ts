import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder,FormGroup,FormControl,Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { InAppBrowser } from '@ionic-native/in-app-browser'



/**
 * Generated class for the BlockchainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-blockchain',
  templateUrl: 'blockchain.html',
})
export class BlockchainPage {
public blockchainform:FormGroup;
public getstate:any=[];
public user_id='';
public _id:any;
public datavalue:any;
public state:any=[];
public formdataarray:any=[];
public displaydata:any;
public createallcustomerdata:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public formBuild:FormBuilder,public storage:Storage,public httpclient:HttpClient,public inappbrowser:InAppBrowser) {
    this.storage.get('userid').then((val) => {
      this.user_id = val;
      //this.allmedia();

      setTimeout(()=>{
        this.datalistfunc();/*it fetch the all data of loged in person */

      },1000);
    });
    this.blockchainform=this.formBuild.group({
      firstname:["",Validators.required],/*field can not be blank*/
      lastname:["",Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.pattern(/^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/)])],
      phone:["",Validators.required],
      address:["",Validators.required],
      city:["",Validators.required],
      state:["",Validators.required],
      zip:["",Validators.required]

    });
   // let fetchdata=this.datalistfunc();
    //console.log(fetchdata);
    this.getstate = this.httpclient.get('http://developmentapi.audiodeadline.com:3090/getusastates');/*getusstates fetch set of record which is hold the state name and abbreviation */
    this.getstate
        .subscribe(data => {
          let result:any;
          result = data;
          this.state=result;
          console.log('result of getstatus');
          console.log(result);
        });
  }

  datalistfunc(){
    this.datavalue=this.httpclient.post('http://developmentapi.audiodeadline.com:3090/datalist',{source:'user',condition:{_id_object:this.user_id}},{});
    this.datavalue
        .subscribe(data=>{
         let result:any;
         result=data;
         this.displaydata=result.res;
         console.log(this.displaydata);/*display data hold the datalist responce*/

         if(result.resc == 1){
             /*in form the fetched data are shown into the form field setValue helps to set the value into the perticular form field*/
         // console.log(this.displaydata[0].firstname);
           this.blockchainform.controls['firstname'].setValue(this.displaydata[0].firstname);
           this.blockchainform.controls['lastname'].setValue(this.displaydata[0].lastname);
           this.blockchainform.controls['email'].setValue(this.displaydata[0].email);
           this.blockchainform.controls['phone'].setValue(this.displaydata[0].phone);
           this.blockchainform.controls['address'].setValue(this.displaydata[0].address);
           this.blockchainform.controls['city'].setValue(this.displaydata[0].city);
           this.blockchainform.controls['state'].setValue(this.displaydata[0].state);
           this.blockchainform.controls['zip'].setValue(this.displaydata[0].zip);
           console.log(this.blockchainform.value);/*it shows the whole form value*/
           console.log(this.displaydata);/* displaydata hold datalist responce*/
           this._id=this.displaydata[0]._id;/*_id push into the global decleared _id veriable*/
         }
        /* console.log('this.formdataarray');
         console.log(this.formdataarray);*/


        });
  }


blockchainsubmit() {
  //alert('in submit block');
  console.log('in submit block');
 /* alert(JSON.stringify(this.formdataarray[0]));
   console.log(JSON.stringify(this.formdataarray[0]));*/
  if (this._id != null && this._id != '' && typeof(this._id) != 'undefined') {
    let fetcheddata: any = {};
    fetcheddata = this.blockchainform.value;/*whole form data store into the fetcheddata veriable*/
    console.log('fetcheddata------');
    console.log(fetcheddata);
    let record=fetcheddata;
     record._id=this._id; /*the record hold the full form data and store the id of the datalist data into record's _id field*/
    console.log(record);
    /*this.createallcustomerdata = this.httpclient.post('http://developmentapi.audiodeadline.com:3090/createallcustomer',record);*/
    this.createallcustomerdata = this.httpclient.post('https://developmentapi.audiodeadline.com:6010/createallcustomer',record);
    /*console.log(this.httpclient.post('http://developmentapi.audiodeadline.com:3090/createallcustomer',fetcheddata));*/

    this.createallcustomerdata
        .subscribe(data => {
          console.log('my data: ', data);
          let result:any;
          result = data;
         // alert(result);
          if(result.status=='success'){
          this.inappbrowser.create('https://development.artistxp.com/signupforblockchainstep2/'+result.data.id,'_system');
          }


        });
  }


   }


  ionViewDidLoad() {
    console.log('ionViewDidLoad BlockchainPage');
  }

}
