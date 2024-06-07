import { Component } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { LoginComponent } from './pages/login/login.component';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { FirebaseTSApp } from 'firebasets/firebasetsApp/firebaseTSApp';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Sparte';
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

  auth = new FirebaseTSAuth();
  constructor (private loginSheet: MatBottomSheet,
    private router: Router
  ){
    this.auth.listenToSignInStateChanges(
      user => {
        this.auth.checkSignInState(
          {
            whenSignedIn: user => {
            },
            whenSignedOut: user => {
            },
            whenSignedInAndEmailNotVerified: user => {
              this.router.navigate(["verificarEmail"]);
            },
            whenSignedInAndEmailVerified: user => {
              
            },
            whenChanged: user => {
              
            },
          }
        );
      }
    );
  }

  onLogoutClick(){
    this.auth.signOut();
  }

  loggedIn(){
    return this.auth.isSignedIn();
  }

  onloginClick(){
    this.loginSheet.open (LoginComponent)
  }
}
