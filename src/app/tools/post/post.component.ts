import { Component, Input, OnInit } from '@angular/core';
import { PostData } from '../../pages/post-feed/post-feed.component';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Input() postData!: PostData;
  private auth = new FirebaseTSAuth();
  private firestore = new FirebaseTSFirestore();

  constructor() { }

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
}
