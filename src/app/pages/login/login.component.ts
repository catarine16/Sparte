import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatCardModule } from '@angular/material/card';

import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
    state = LoginCompState.LOGIN
    firebasetsAuth: FirebaseTSAuth;
  constructor() {
    this.firebasetsAuth = new FirebaseTSAuth();
  }
  ngOnInit(): void {
  }

  onResetClick(resetEmail: HTMLInputElement){
    let email = resetEmail.value;
    if(this.isNotEmpty(email)) {
      this.firebasetsAuth.sendPasswordResetEmail(
        {
          email: email,
          onComplete: err => {
            alert(`Email de recuperação enviado para ${email}`)
          }
        }
      )
    }
  }

  onLogin(
    loginEmail: HTMLInputElement,
    loginPassword: HTMLInputElement,
  ){
    let email = loginEmail.value;
    let password = loginPassword.value;

    if(this.isNotEmpty(email) && this.isNotEmpty(password)) {
      this.firebasetsAuth.signInWith(
        {
          email: email,
          password: password,
          onComplete: (uc) => {
            alert("Logado");
          },
          onFail: (err) => {
            alert(err);
          }
        }
      );
    }
  }

  onRegisterClick(
    registerEmail: HTMLInputElement,
    registerPassword: HTMLInputElement,
    registerConfirmPassword: HTMLInputElement,
  ){
    let email = registerEmail.value;
    let password = registerPassword.value;
    let confirmPassword = registerConfirmPassword.value;

    if(
      this.isNotEmpty(email) &&
      this.isNotEmpty(password) &&
      this.isNotEmpty(confirmPassword) &&
      this.isAMatch(password, confirmPassword)
    ){
      this.firebasetsAuth;createAccountWith(
        {
          email: email,
          password: password,
          onComplete: uc => {
            alert("Conta criada com sucesso.");
            registerEmail.value = "";
            registerPassword.value = "";
            registerConfirmPassword.value = ""; 
          },
          onFail: err => {
            alert("Erro ao criar a conta.");
          }
        }
      );
    }

  }

  isNotEmpty(text: string) {
    return text != null && text.length > 0;
  }

  isAMatch(text: string, comparedWith: string){
    return text == comparedWith;
  }

  Esquecimento() {
     this.state = LoginCompState.ESQUECER_SENHA
  }
  Criacao() {
     this.state = LoginCompState.REGISTRO

  }
  Entrada() {
    this.state = LoginCompState.LOGIN

  }
  isEntradaState(){
    return this.state == LoginCompState.LOGIN
  }
  isCriacaoState(){
    return this.state == LoginCompState.REGISTRO
  }
  isEsquecimentoState(){
    return this.state == LoginCompState.ESQUECER_SENHA
  }
getStateText(){
  switch(this.state){
    case LoginCompState.LOGIN:
      return "Login";
   case LoginCompState.REGISTRO:
      return "Registro";
  case LoginCompState.ESQUECER_SENHA:
      return "Esqueceu Senha";
  }
}
}

export enum LoginCompState{
   LOGIN,
   REGISTRO,
   ESQUECER_SENHA,
}