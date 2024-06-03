import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Sparte';
  ngOnInit(): void {
    const img: HTMLImageElement = document.createElement("img");
    img.src = "/assets/img/back2.png";
    img.style.position = "fixed";
    img.style.top = "0";
    img.style.left = "0";
    img.style.width = "100vw";
    img.style.height = "100vh";
    img.style.zIndex = "-1";
    document.body.appendChild(img);
  }
}
