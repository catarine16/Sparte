import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// import { BrowserModule } from '@angular/platform-browser';

//pages
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { SobrenosComponent } from './pages/sobrenos/sobrenos.component';
import { ArtsComponent } from './pages/arts/arts.component';
import { MainscreenComponent } from './pages/mainscreen/mainscreen.component';
import { InspiracaoComponent } from './pages/inspiracao/inspiracao.component';
import { EstudosComponent } from './pages/estudos/estudos.component';
import { HomeComponent } from './pages/home/home.component';
import { TopbarComponent } from './pages/topbar/topbar.component';
import { environment } from '../environments/environment';
import { AuthenticatorComponent } from './tools/authenticator/authenticator.component';
//angular material
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'; 
// import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
//firebase
import { FirebaseTSApp } from 'firebasets/firebasetsApp/firebaseTSApp';
import { VerificarEmailComponent } from './pages/verificar-email/verificar-email.component';
import { PerfilComponent } from './tools/perfil/perfil.component';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
// import { FeedComponent } from './pages/feed/feed.component';
// import { PostagemComponent } from './tools/postagem/postagem.component';
// import { PostComponent } from './tools/post/post.component';

import { PostFeedComponent } from './pages/post-feed/post-feed.component';
import { CreatePostComponent } from './tools/create-post/create-post.component';
import { PostComponent } from './tools/post/post.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    SobrenosComponent,
    ArtsComponent,
    MainscreenComponent,
    InspiracaoComponent,
    EstudosComponent,
    HomeComponent,
    TopbarComponent,
    AuthenticatorComponent,
    VerificarEmailComponent,
    PerfilComponent,
    // FeedComponent,
    // PostagemComponent,
    // PostComponent,
   
    PostFeedComponent,
    CreatePostComponent,
    PostComponent,
    EditPostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatBottomSheetModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    FormsModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(){
    FirebaseTSApp.init(environment.firebaseConfig);
  }
}
