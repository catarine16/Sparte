import { Component, ElementRef, Renderer2 } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { AppComponent } from '../../app.component';
@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css'
})
export class TopbarComponent {
  isNavbarOpen = false; 
  auth = new FirebaseTSAuth ();
  userHasProfile = true;
  constructor(private el: ElementRef, private renderer: Renderer2, private loginSheet: MatBottomSheet) {}
  toggleNavbar() {
    this.isNavbarOpen = !this.isNavbarOpen;
    const navbar = this.el.nativeElement.querySelector('.navbar');
    if (this.isNavbarOpen) {
      this.renderer.setStyle(navbar, 'left', '0');
    } else {          
      this.renderer.setStyle(navbar, 'left', '-250px');
    } 
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

  

