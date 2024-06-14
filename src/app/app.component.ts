import { Component } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { LoginComponent } from './pages/login/login.component';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { Router } from '@angular/router';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';

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
  userDocument!: UserDocument; //comando embaixo mostra outro erro
  //private static userDocument: UserDocument;
  // o ! foi inserido apenas para eliminar os alertas e não necessariamente resolve os bugs


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
              AppComponent.userDocument = null;
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

  getUserName(){
    try {
      return AppComponent.userDocument.publicName;
    } catch (err) {
      
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
          AppComponent.userDocument.userId = this.auth.getAuth().currentUser?.uid;
          if (this.userHasProfile) {
            //this.router.navigate(["feed"]);

          }
        }
      }
    );
  }

  onLogoutClick() {
    this.auth.signOut();
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