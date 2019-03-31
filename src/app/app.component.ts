import {Component, ViewChild} from '@angular/core';
import { Platform,NavController,Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Deeplinks } from '@ionic-native/deeplinks';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Instagram } from '@ionic-native/instagram';

import { HomePage } from '../pages/home/home';
import { ShareinstagramPage } from '../pages/shareinstagram/shareinstagram';
@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    rootPage:any ;
    @ViewChild(Nav) navChild:Nav;
    constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,private deeplinks: Deeplinks,private iab: InAppBrowser,private instagram: Instagram) {
        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();


            this.deeplinks.routeWithNavController(this.navChild, {
                //'/about-us': ShareinstagramPage,
                '/shareinsta/:url': ShareinstagramPage
            }).subscribe(match => {
                // match.$route - the route we matched, which is the matched entry from the arguments to route()
                // match.$args - the args passed in the link
                // match.$link - the full link data
                console.log('Successfully matched route', match);
                //alert('Successfully matched route'+ match.$route);
                alert('Successfully matched route args'+ match.$args.url);
                //alert('Successfully matched route'+ match.$link);
                if(match.$args.url!=null){
                    this.rootPage = HomePage;
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
                this.rootPage=ShareinstagramPage;
                // nomatch.$link - the full link data
                this.iab.create('https://development.artistxp.com/','_system');
                console.error('Got a deeplink that didn\'t match', nomatch);
            });


        });
    }
}