import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isAuth: boolean;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    firebase.auth().onAuthStateChanged(
      (user) => {
        this.isAuth = !!user;
      });
  }

  onSignOut() {
    this.authService.signOutUser();
  }

}
