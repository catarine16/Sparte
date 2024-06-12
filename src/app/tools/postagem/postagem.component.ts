import { Component, CreateComputedOptions, OnInit } from '@angular/core';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import { FirebaseTSStorage } from 'firebasets/firebasetsStorage/firebaseTSStorage';
import { FirebaseTSApp } from 'firebasets/firebasetsApp/firebaseTSApp';
import { MatDialogRef } from '@angular/material/dialog';



@Component({
  selector: 'app-postagem',
  templateUrl: './postagem.component.html',
  styleUrl: './postagem.component.css'
})
export class PostagemComponent implements OnInit {
  selectedImageFile: File | any = null;
  auth = new FirebaseTSAuth();
  firestore = new FirebaseTSFirestore();
  storage = new FirebaseTSStorage();
  constructor(private dialog: MatDialogRef<PostagemComponent>) { }
  ngOnInit(): void {
  }
  onPostClick (commentInput: HTMLTextAreaElement){
    let comment = commentInput.value;
    if(comment.length <= 0 ) return;
    if(this.selectedImageFile) {
      this.uploadImagePost(comment);
    } else {
      this.uploadPost(comment);
    }

  }

  uploadImagePost(comment: string){
    let postId = this.firestore.genDocId();
    this.storage.upload(
      {
        uploadName: "upload Image Post",
        path: ["Posts", postId, "image"],
        data: {
          data: this.selectedImageFile
        },
        onComplete: (downloadUrl) => {
          
        }
      }
    );
  }

  uploadPost(comment: string){
    this.firestore.create(
      {
        path: ["Posts"],
        data: {
          comment: comment,
          creatorId: this.auth.getAuth().currentUser?.uid,
          timestamp: FirebaseTSApp.getFirestoreTimestamp()
        },
        onComplete: (docId) => {
          this.dialog.close();
        }
      }  
    );
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
        //  postPreviewImage.src = readableString;
      }


    );
  }
}

