import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
// import {firebaseTSStorage} from 'firebasets/firebasetsStorage/firebaseTSStorage';




@Component({
  selector: 'app-postagem',
  templateUrl: './postagem.component.html',
  styleUrl: './postagem.component.css'
})
export class PostagemComponent implements OnInit {
  selectedImageFile: File | any = null;
  constructor() { }
  ngOnInit(): void {
  }
  onPostClick (commentInput: HTMLTextAreaElement){

  }
  onPhotoSelected(photoSelector: HTMLInputElement) {
    this.selectedImageFile = photoSelector.files![0] || null;
    if (this.selectedImageFile) return;
    let filesReader = new FileReader();
    filesReader.readAsDataURL(this.selectedImageFile);
    filesReader.addEventListener(
      "loadend",
      ev => {
        let readableString = filesReader.result?.toString();
        let postPreviewImage = <HTMLImageElement>document.getElementById("post-preview-image");
        // postPreviewImage.src? = readableString; bugs
      }


    );
  }
}

