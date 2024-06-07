import { Component, OnInit } from '@angular/core';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verificar-email',
  templateUrl: './verificar-email.component.html',
  styleUrl: './verificar-email.component.css'
})
export class VerificarEmailComponent implements OnInit {

  auth = new FirebaseTSAuth();

  constructor(private router:Router) {}

  ngOnInit(): void {
    if(
      this.auth.isSignedIn() &&
      !this.auth.getAuth().currentUser?.emailVerified
    ) {
      this.auth.sendVerificationEmail();
    } else {
      this.router.navigate([""])
    }
  }

  onResendClick(){
    this.auth.sendVerificationEmail();
  }
}
