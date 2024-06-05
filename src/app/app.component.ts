import { Component } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { LoginComponent } from './pages/login/login.component';

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
  constructor (private loginSheet: MatBottomSheet){

  }
  onloginClick(){
    this.loginSheet.open (LoginComponent)
  }
}
