import { Component, Input, OnInit } from '@angular/core';
import { PostData } from '../../pages/feed/feed.component';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent implements OnInit {
  @input() postData: PostData;
  constructor() { }

  ngOnInit(): void {
  }
}
