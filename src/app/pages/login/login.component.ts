import { Component } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { AuthenticatorComponent } from '../../tools/authenticator/authenticator.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private loginSheet: MatBottomSheet){}


  onLoginClick(){
    this.loginSheet.open(AuthenticatorComponent);
  }
}
