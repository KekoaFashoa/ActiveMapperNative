import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';


import firebase from 'firebase';


@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage: any = HomePage;

  constructor(platform: Platform) {

    const config = {
      apiKey: "AIzaSyBioiHZS_cpZT1IqBuskIjszs2RqqvwG-4",
      authDomain: "activemapper.firebaseapp.com",
      databaseURL: "https://activemapper.firebaseio.com",
      storageBucket: "activemapper.appspot.com",
      messagingSenderId: "928318092443"    };
    firebase.initializeApp(config);

    firebase.auth().onAuthStateChanged( user => {
      if (!user) {
        this.rootPage = LoginPage;
        console.log("There's not a logged in user!");
      }
    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
}
