import { Component, Input, OnInit, input } from '@angular/core';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit {
  @Input() show: boolean = false ;
  firestore: FirebaseTSFirestore;
  auth: FirebaseTSAuth;

  constructor (){
    this.firestore = new FirebaseTSFirestore();
    this.auth= new FirebaseTSAuth();
  }
  ngOnInit(): void {
    
  }
  onContinuarClick(
    nameInput: HTMLInputElement,
    descricaoInput: HTMLTextAreaElement

  ){
    let name = nameInput.value;
    let descricao = descricaoInput.value;
    this.firestore.create({
      path: ["Users",  this.auth?.getAuth()?.currentUser?.uid || '{}'],
      data:{
            publlicName: name,
            descricao: descricao,
      },
      onComplete: (docId) =>{
        alert ("Perfil Criado")
        nameInput.value = "";
      },
      onFail: (err) => {
        
      }
        

    })
  }
}