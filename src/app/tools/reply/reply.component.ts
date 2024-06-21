import { Component, OnInit, inject } from '@angular/core';
import { FirebaseTSFirestore, OrderBy } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FirebaseTSApp } from 'firebasets/firebasetsApp/firebaseTSApp';
import { AppComponent } from '../../app.component';
@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrl: './reply.component.css'
})
export class ReplyComponent implements OnInit {
  ngOnInit(): void {
    
  }
}
//   firestore = new FirebaseTSFirestore();
//   comments: Comment [] = [];
//   constructor (@inject (MAT_DIALOG_DATA) private posID: string) {}
 

//   ngOnInit(): void {
//     this.getComments();
//   }

//   // isCommentCreator(comment: Comment){
//   //   try {
//   //     return comment.creatorId == AppComponent.getUserDocument().userId;
//   //   } catch (err) {
      
//   //   }
//   // }
//   getComments(){
//     this.firestore.listenToCollection(
//       {
//         name: "Post Comments",
//         path: ["Posts", this.posID, "PostComments"],
//         where: [new OrderBy("timestamp", "asc")],
//         onUpdate: (result) => {
//           result.docChanges().forEach(
//             postCommentDoc => {
//               if(postCommentDoc.type == "added") {
//                 this.comments.unshift(<Comment>postCommentDoc.doc.data());
//               }
//             }
//           )
//         }
//       }
//     );
//   }
//   onSendClick(commentInput: HTMLInputElement){
//     if (!(commentInput.value.length > 0)) return;
//     this.firestore.create(
//       {
//         path: ["Posts", this.posID, "PostComments"],
//         data: {
//           comment: commentInput.value,
//           creatorId: AppComponent.getUserDocument().userId,
//           creatorName: AppComponent.getUserDocument().publicName,
//           timestamp: FirebaseTSApp.getFirestoreTimestamp(),
//         },
//         onComplete: (docId) => {
//           commentInput.value = "";
//         }
//       }
//     )
//   }
// }
// export interface Comment {
//   creatorId: string;
//   creatorName: string;
//   comment: string;
//   timestamp: firebase.default.firestore.Timestamp;
// 