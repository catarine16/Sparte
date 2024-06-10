import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PostagemComponent } from '../../tools/postagem/postagem.component';
@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css'
})
export class FeedComponent implements OnInit {

  constructor(private dialog: MatDialog){ }
  ngOnInit(): void {
  
  }
onCreatePostClick(){
   this.dialog.open(PostagemComponent);
}
}
