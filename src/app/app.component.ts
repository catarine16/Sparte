import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { LoginComponent } from './pages/login/login.component';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { Router } from '@angular/router';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']  // Changed to styleUrls
})
export class AppComponent implements OnInit {
  title = 'Sparte';
  auth = new FirebaseTSAuth();
  firestore = new FirebaseTSFirestore();
  userHasProfile = false;  // Initialized to a default value
  userDocument: UserDocument | null = null;  // Properly typed and initialized to null
  static userDocument: UserDocument | null;

  constructor(private loginSheet: MatBottomSheet,
              private router: Router) {
    this.auth.listenToSignInStateChanges(user => {
      this.auth.checkSignInState({
        whenSignedIn: user => {
          // Additional logic can be added here if needed
        },
        whenSignedOut: user => {
          this.userDocument = null;
        },
        whenSignedInAndEmailNotVerified: user => {
          this.router.navigate(["verificarEmail"]);
        },
        whenSignedInAndEmailVerified: user => {
          this.getUserProfile();
        },
        whenChanged: user => {
          // Logic to handle state changes can be added here
        },
      });
    });
  }

  ngOnInit(): void {
    const img: HTMLImageElement = document.createElement("img");
    img.src = "/img/back2.png";
    img.style.position = "fixed";
    img.style.top = "0";
    img.style.left = "0";
    img.style.width = "100vw";
    img.style.height = "100vh";
    img.style.zIndex = "-1";
    document.body.appendChild(img);
  }

  static getUserDocument(): UserDocument | null {
    return this.userDocument;  // Static access still allowed, though it's better to reconsider this design
  }

  getUserName(): string | undefined {
    return this.userDocument?.publicName;  // Optional chaining to safely access publicName
  }

  getUserProfile() {
    const userId = this.auth.getAuth().currentUser?.uid;
    if (userId) {
      this.firestore.listenToDocument({
        name: "Recebendo documento...",
        path: ["Users", userId],
        onUpdate: (result) => {
          if (result.exists) {
            this.userDocument = <UserDocument>result.data();
            this.userDocument.userId = userId;  // Ensure userId is assigned
            this.userHasProfile = true;  // Indicate profile existence
            // this.router.navigate(["feed"]);  // Uncomment if navigation is needed
          } else {
            this.userDocument = null;
            this.userHasProfile = false;  // Indicate absence of profile
          }
        }
      });
    } else {
      console.warn("No user is currently signed in.");
    }
  }

  onLogoutClick() {
    this.auth.signOut();
  }

  loggedIn(): boolean {
    return this.auth.isSignedIn();
  }

  onLoginClick() {
    this.loginSheet.open(LoginComponent);
  }
}

export interface UserDocument {
  publicName: string;
  description: string;
  userId: string;
}
