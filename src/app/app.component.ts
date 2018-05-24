import {Component} from '@angular/core';
import * as firebase from 'firebase';
import {configFirebase} from './properties/firebase.properties';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor() {

    firebase.initializeApp(configFirebase);

  }
}
