import {Component} from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor() {
    const config = {
      apiKey: 'AIzaSyCTm43jS8KFKbAn3Ecb2fIMuVwdbIJWoUA',
      authDomain: 'librairieocr.firebaseapp.com',
      databaseURL: 'https://librairieocr.firebaseio.com',
      projectId: 'librairieocr',
      storageBucket: 'librairieocr.appspot.com',
      messagingSenderId: '672206819027'
    };
    firebase.initializeApp(config);

  }
}
