import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { AuthData } from '../../providers/auth-data';
import { GoogleMap, GoogleMapsEvent, GoogleMapsLatLng } from 'ionic-native';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

    map: GoogleMap;

    constructor(public navCtrl: NavController, public platform: Platform, public authData: AuthData) {
        platform.ready().then(() => {
            this.loadMap();
        });        
    }

    loadMap(){
 
        let location = new GoogleMapsLatLng(30.4157567,-91.0514299);
 
        this.map = new GoogleMap('map', {
            'backgroundColor': 'white',
            'mapTypeId': 'MAP_TYPE_HYBRID',
            'controls': {
                'compass': true,
                'myLocationButton': true,
                'indoorPicker': true,
                'zoom': true
            },
            'gestures': {
                'scroll': true,
                'tilt': true,
                'rotate': true,
                'zoom': true
            },
            'camera': {
                'latLng': location,
                'tilt': 30,
                'zoom': 15,
                'bearing': 50
            }
        });
 
        this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
            console.log('Map is ready!');
            this.getUserLocation();
        });
    }


    getUserLocation() {
        this.map.getMyLocation().then((userLocation) => {
            console.log(userLocation.latLng);
            this.map.animateCamera({
                'target': userLocation.latLng,
                'zoom': 18,
                'duration' : 2000
            });
        }, (error) => {
            console.log(error);
        });
    }

    logMeOut() {
        this.authData.logoutUser().then( () => {
            this.navCtrl.setRoot(LoginPage);
        });
    }

}
