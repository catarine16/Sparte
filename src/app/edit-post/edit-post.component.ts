import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PostData } from '../pages/post-feed/post-feed.component';
import { FirebaseTSStorage } from 'firebasets/firebasetsStorage/firebaseTSStorage';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {
  newComment: string = '';
  newImageFile: File | null = null;
  storage = new FirebaseTSStorage();
  firestore = new FirebaseTSFirestore();

  constructor(
    public dialogRef: MatDialogRef<EditPostComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { postData: PostData }
  ) {}

  ngOnInit(): void {
    this.newComment = this.data.postData.comment;
  }

  onPhotoSelected(event: Event) {
    // Certifique-se de que o alvo do evento é um HTMLInputElement
    if (event.target instanceof HTMLInputElement) {
      const input = event.target;
      // Verifique se há arquivos selecionados
      if (input.files && input.files[0]) {
        this.newImageFile = input.files[0];
        const fileReader = new FileReader();
        fileReader.readAsDataURL(this.newImageFile);
        fileReader.addEventListener('loadend', () => {
          const postPreviewImage = document.getElementById('post-preview-image') as HTMLImageElement;
          if (postPreviewImage) {
            postPreviewImage.src = fileReader.result as string;
          }
        });
      }
    }
  }

  async onSaveClick() {
    if (this.newImageFile) {
      // Se há uma nova imagem selecionada, faça upload da imagem e atualize o Firestore
      await this.uploadNewImage(this.data.postData.postId!);
    } else {
      // Se não há nova imagem, apenas atualize o comentário no Firestore
      this.updatePostData({ comment: this.newComment });
    }
  }

  uploadNewImage(postId: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const uploadPath = ['Posts', postId, 'image'];
      this.storage.upload({
        uploadName: "Upload Image Post", // Adicionei o uploadName aqui
        path: uploadPath,
        data: {
          data: this.newImageFile
        },
        onComplete: (downloadUrl) => {
          // Atualize o Firestore com a nova URL da imagem e o novo comentário
          this.updatePostData({
            imageUrl: downloadUrl,
            comment: this.newComment
          });
          resolve();
        },
        onFail: (error) => {
          console.error('Erro ao fazer upload da imagem:', error);
          reject(error);
        }
      });
    });
  }

  updatePostData(updatedFields: Partial<PostData>) {
    this.firestore.update({
      path: ['Posts', this.data.postData.postId!],
      data: updatedFields,
      onComplete: () => {
        console.log('Post atualizado com sucesso');
        Object.assign(this.data.postData, updatedFields); // Atualize localmente o postData
        this.dialogRef.close(this.data.postData); // Feche o diálogo após a atualização
      },
      onFail: (error) => {
        console.error('Erro ao atualizar o post:', error);
      }
    });
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}

