import { Component } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { LoginComponent } from './pages/login/login.component';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';

import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import {Router} from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Sparte';
  auth = new FirebaseTSAuth();
  firestore = new FirebaseTSFirestore();
  userHasProfile = true;
  static userDocument: UserDocument;


  ngOnInit(): void {
    const img: HTMLImageElement = document.createElement("img");
    img.src = " /img/back2.png";
    img.style.position = "fixed";
    img.style.top = "0";
    img.style.left = "0";
    img.style.width = "100vw";
    img.style.height = "100vh";
    img.style.zIndex = "-1";
    document.body.appendChild(img);

  }





  constructor(private loginSheet: MatBottomSheet,
    private router: Router
  ) {

    this.auth.listenToSignInStateChanges(
      user => {
        this.auth.checkSignInState(
          {
            whenSignedIn: user => {
            },
            whenSignedOut: user => {
              this.router.navigate([""]);
            },
            whenSignedInAndEmailNotVerified: user => {
              this.router.navigate(["verificarEmail"]);
            },
            whenSignedInAndEmailVerified: user => {
              this.getUserProfile();
            },
            whenChanged: user => {

            },
          }
        );
      }
    );
  }


  public static getUserDocument(){
    return AppComponent.userDocument;
  }

public static setUserDocument(vlr : UserDocument){
    AppComponent.userDocument = vlr;
  }
  
  getUserName(){
    try {
      return AppComponent.userDocument.publicName;
    } catch (err) {
      return null;
    }
  }

  getUserProfile() {
    this.firestore.listenToDocument(
      {
        name: "Recebendo documento...",
        path: ["Users", this.auth?.getAuth()?.currentUser?.uid || '{}'],

        onUpdate: (result) => {
          AppComponent.userDocument = <UserDocument>result.data();
          this.userHasProfile = result.exists;
          AppComponent.userDocument.userId = this.auth?.getAuth()?.currentUser?.uid || '{}';
          if (this.userHasProfile) {
          this.router.navigate(["feed"]);

          }
        }
      }
    );
  }

  onLogoutClick() {
    this.auth.signOut();
    this.router.navigate([""])
  
  }

  loggedIn() {
    return this.auth.isSignedIn();
  }

  onloginClick() {
    this.loginSheet.open(LoginComponent)
  }
}

export interface UserDocument {
  publicName: string;
  description: string;
  userId: string;
}