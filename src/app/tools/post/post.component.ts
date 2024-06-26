import { Component, Input, OnInit } from '@angular/core';
import { PostData } from '../../pages/post-feed/post-feed.component';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import { EditPostComponent } from '../../edit-post/edit-post.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Input() postData!: PostData;
  private auth = new FirebaseTSAuth();
  private firestore = new FirebaseTSFirestore();

  constructor(private dialog: MatDialog) { } // Injetar MatDialog no construtor

  ngOnInit(): void { }

  Delete() {
    const currentUser = this.auth.getAuth().currentUser;
    if (currentUser && this.postData.creatorId === currentUser.uid) {
      if (confirm('Você tem certeza que deseja deletar este post?')) {
        if (this.postData.postId) { // Verificação de segurança
          this.firestore.delete({
            path: ['Posts', this.postData.postId!], // Usando o operador de não-null assertion
            onComplete: () => {
              console.log('Post deletado com sucesso');
            },
            onFail: (error) => {
              console.error('Erro ao deletar post:', error);
            }
          });
        } else {
          console.error('Erro: postId está indefinido.');
        }
      }
    } else {
      alert('Você não tem permissão para deletar este post.');
    }
  }

  editPost() {
    const currentUser = this.auth.getAuth().currentUser;
    if (currentUser && this.postData.creatorId === currentUser.uid) {
      const dialogRef = this.dialog.open(EditPostComponent, {
        data: {
          postData: this.postData
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.updatePost(result);
        }
      });
    } else {
      alert('Você não tem permissão para editar este post.');
    }
  }

  updatePost(updatedPostData: PostData) {
    if (this.postData.postId) {
      this.firestore.update({
        path: ['Posts', this.postData.postId!],
        data: updatedPostData,
        onComplete: () => {
          console.log('Post atualizado com sucesso');
        },
        onFail: (error) => {
          console.error('Erro ao atualizar post:', error);
        }
      });
    }
  }
}
