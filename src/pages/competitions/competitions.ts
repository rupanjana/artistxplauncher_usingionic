import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import {DomSanitizer} from "@angular/platform-browser";
declare var moment: any;
/**
 * Generated class for the CompetitionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-competitions',
  templateUrl: 'competitions.html',
})
export class CompetitionsPage {
public competitionlistval:any;
public competitionlist:any;
public fileurl:any='https://developmentapi.audiodeadline.com/nodeserver/uploads/';
public serverurl='https://developmentapi.audiodeadline.com/server3.php?q=';
  constructor(public navCtrl: NavController, public navParams: NavParams,public httpClient:HttpClient, private sanitizer: DomSanitizer) {
   this.getCompetitionList();
  }

   opencompetitionrule(){
   this.navCtrl.push('CompetitionrulesPage');
   }
   getbgimg(img){
     return this.sanitizer.bypassSecurityTrustStyle('url('+this.fileurl+img+')');
  }
  getDateT(time){
    return moment.unix(time).format('Do MMM, YYYY');
  }
   getCompetitionList(){
    this.competitionlistval=this.httpClient.post('https://developmentapi.audiodeadline.com/server3.php?q=competitionlist',{type: 'active'});
    this.competitionlistval.subscribe(res=>{
     // console.log(JSON.stringify(res));
      let result:any;
      result=res;
      this.competitionlist=result.res;
      console.log(this.competitionlist);
    });
   }
  ionViewDidLoad() {
    console.log('ionViewDidLoad CompetitionsPage');
  }

}
