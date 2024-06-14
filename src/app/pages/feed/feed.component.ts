import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PostagemComponent } from '../../tools/postagem/postagem.component';
import { FirebaseTSFirestore, OrderBy, Where, Limit } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css'
})
export class FeedComponent implements OnInit {
  firestore = new FirebaseTSFirestore();
  posts: PostData [] = [];
post: any;
  constructor(private dialog: MatDialog){ }
  ngOnInit(): void {
    this.getPosts();
  }
  
onCreatePostClick(){
   this.dialog.open(PostagemComponent);
}

getPosts(){
  this.firestore.getCollection(
    {
      path: ["Posts"],
      where: [
        new OrderBy("timestamp", "desc"),
        new Limit(10),
      ],
      onComplete: (result) => {
        result.docs.forEach(
          doc => {
            let post = <PostData>doc.data();
            post.postId = doc.id;
            this.posts.push(post);
          }
        )
      },
      onFail: err => {

      }
    }
  )
}
}

export interface PostData {
  comment: string;
  creatorId: string;
  imageUrl?: string;
  postId: string;
}