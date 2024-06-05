import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatCardModule } from '@angular/material/card';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
    state = LoginCompState.LOGIN
  constructor() { }
  ngOnInit(): void {

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