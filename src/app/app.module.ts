import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { FirebaseTSApp } from 'firebasets/firebasetsApp/firebaseTSApp';
import { environment } from '../environments/environment';
import { AuthenticatorComponent } from './tools/authenticator/authenticator.component';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';


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
    AuthenticatorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatBottomSheetModule,
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
