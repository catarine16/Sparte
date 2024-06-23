import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreatePostComponent } from '../../tools/create-post/create-post.component';
import { FirebaseTSFirestore, Limit, OrderBy } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';

@Component({
  selector: 'app-post-feed',
  templateUrl: './post-feed.component.html',
  styleUrls: ['./post-feed.component.css']
})
export class PostFeedComponent implements OnInit {
  firestore = new FirebaseTSFirestore();
  posts: PostData[] = [];

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getPost();
  }

  onCreatePostClick() {
    this.dialog.open(CreatePostComponent);
  }

  getPost() {
    this.firestore.getCollection({
      path: ['Posts'],
      where: [
        new OrderBy('timestamp', 'desc'),
        new Limit(10)
      ],
      onComplete: (result) => {
        this.posts = result.docs.map(doc => {
          let post = <PostData>doc.data();
          post.postId = doc.id; // Adiciona o ID do documento ao objeto post
          return post;
        });
      },
      onFail: (err) => {
        console.error('Erro ao obter posts:', err);
      }
    });
  }
}

export interface PostData {
  postId?: string; // Adicione o campo postId
  comment: string;
  creatorId: string;
  imageUrl?: string;
  timestamp?: any; // Adicione timestamp se necessário
}
