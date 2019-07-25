import {Component, ViewChild} from '@angular/core';
import { Platform,NavController,Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Deeplinks } from '@ionic-native/deeplinks';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Instagram } from '@ionic-native/instagram';
import { Storage } from '@ionic/storage';
import { MediaformPage } from '../pages/mediaform/mediaform';
import { LoginPage } from '../pages/login/login';
import { ShareinstagramPage } from '../pages/shareinstagram/shareinstagram';


import { MediawallPage } from '../pages/mediawall/mediawall';
//import {TermsPage} from "../pages/terms/terms";
import { AllmediaPage } from '../pages/allmedia/allmedia';
import { TrendingmediaPage } from '../pages/trendingmedia/trendingmedia';
import { SearchPage } from "../pages/search/search";
import { MenuController } from 'ionic-angular';
@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    rootPage:any=LoginPage;
    @ViewChild(Nav) navChild:NavController;
    pages: Array<{title: string, component: any, type:any,submenu:any }>
    //public selmenu:any=null;
    constructor(public platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,private deeplinks: Deeplinks,private iab: InAppBrowser,private instagram: Instagram,private storage: Storage,public menu:MenuController) {
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
            this.storage.set('isinsta',null);
            if (this.platform.is('ios')) {
                // This will only print when on iOS
                //alert('it is in ios in start block..');
                console.log('I am an iOS device!');
                //this.navctrl.push(LoginPage);
               this.pages=[
                   {
                       title:'Medialist',component:'MediaformPage'
                   },
                   {
                       title:'Mediawall',component:'MediawallPage',type:'multiple',
                       submenu:[
                           {
                             title:'All Media',component:'AllmediaPage'
                           },
                           {
                               title:'Trending Media', component:'TrendingmediaPage'
                           }
                       ]

                   },
                   {
                       title:'Search',component:'SearchPage',type:'multiple',
                       submenu:[
                           {
                               title:'Artist Search',component:'ArtistsearchPage'
                           },
                           {
                               title:'User Search',component:'UsersearchPage'
                           }

                       ]
                   },




                 /*  {
                       title:'Submenu',type:'multiple',
                       submenu:[
                           {
                       title:'medialist',component:'MediaformPage'
                       },
                       {
                           title:'Search',component:'SearchPage'
                       }]
                   },
                   {
                       title:'Submenu2',type:'multiple',
                       submenu:[
                           {
                       title:'medialist',component:'MediaformPage'
                        },
                       {
                           title:'Search',component:'SearchPage'
                       }]
                   }*/
               ];

            }


            this.deeplinks.routeWithNavController(this.navChild, {
                //'/about-us': ShareinstagramPage,
                '/shareinsta/:url': ShareinstagramPage
            }).subscribe(match => {
                // match.$route - the route we matched, which is the matched entry from the arguments to route()
                // match.$args - the args passed in the link
                // match.$link - the full link data
                console.log('Successfully matched route', match);
                //alert('Successfully matched route'+ match.$route);
                //alert('Successfully matched route args'+ match.$args.url);
                //alert('Successfully matched route'+ match.$link);
                if(match.$args.url!=null){
                    this.storage.set('isinsta',true);
                    //this.rootPage = HomePage;
                    //this.navChild.push(ShareinstagramPage);
                   // alert('Successfully matched route args'+ match.$args.url);


                    let TIME_IN_MS = 3000;
                    let hideFooterTimeout = setTimeout( () => {
                       // alert(' args before '+ match.$args.url);
                        // somecode


                        this.instagram.share('https://developmentapi.audiodeadline.com/nodeserver/uploads/pictures/5c409e01a3d1bf857f1ecbe9/updatedpdfaboutaffilates-1552669785.jpg', 'artistxp !!')
                            .then(() => {
                                //alert('shared');
                                console.log('Shared!');}
                            )
                            .catch((error: any) => {
                                console.error(error);
                                //alert(error);

                            });
                       // alert(' args after '+ match.$args.url);

                    }, TIME_IN_MS);


                }
            }, nomatch => {
                this.storage.set('isinsta',false);
                /*this.rootPage=ShareinstagramPage;
                // nomatch.$link - the full link data
                this.iab.create('https://development.artistxp.com/','_system');*/
                console.error('Got a deeplink that didn\'t match', nomatch);
            });


        });
    }
    gotopage(page:any){
        console.log(page);
        this.navChild.setRoot(page.component);
        this.menu.close();
    }
    selmenuf(page:any){
        if(this.selmenu==page.title) this.selmenu=null;
        else
        this.selmenu=page.title;
    }
}