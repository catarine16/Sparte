import { Component, Input, OnInit, input } from '@angular/core';
import { PostData } from '../../pages/post-feed/post-feed.component';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent implements OnInit {
  @Input() postData!: PostData;
  // creatorName: string;
  // creatorDescrption: string;
  // firestore = new FirebaseTSFirestore;
  constructor (){

  }
  ngOnInit(): void {
      //  this.getCreatorInfo();
     }
  //  getCreatorInfo(){
  //     this.firestore.getDocument(
  //       {
  //         path: ["Users", this.postData.creatorId],
  //         onComplete: result => {
  //           let userDocument = result.data();
  //           this.creatorName = userDocument.publicName;
  //           this.creatorDescrption = 
  //         }
  //       }
  //     )
  //  }
}
