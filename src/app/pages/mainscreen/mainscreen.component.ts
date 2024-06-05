import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-mainscreen',
  templateUrl: './mainscreen.component.html',
  styleUrl: './mainscreen.component.css'
})
export class MainscreenComponent implements OnInit{
  constructor(private loginSheet: MatBottomSheet){

  }
  ngOnInit(): void {
    
  }
onLogarclicked(){
   this.loginSheet.open(LoginComponent);
}
}
