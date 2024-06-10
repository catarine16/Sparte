import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//pages
import { MainscreenComponent } from './pages/mainscreen/mainscreen.component';
import { ArtsComponent } from './pages/arts/arts.component';
import { InspiracaoComponent } from './pages/inspiracao/inspiracao.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { SobrenosComponent } from './pages/sobrenos/sobrenos.component';
import { EstudosComponent } from './pages/estudos/estudos.component';
import { VerificarEmailComponent } from './pages/verificar-email/verificar-email.component';
import { FeedComponent } from './pages/feed/feed.component';

const routes: Routes = [
  {path: '', component: MainscreenComponent},
  {path: 'login', component: LoginComponent},
  {path: 'registro', component: RegistroComponent},
  {path: 'sobrenos', component: SobrenosComponent},
  {path: 'estudos', component: EstudosComponent},
  {path:'arts', component: ArtsComponent},
  {path: 'inspiracao', component: InspiracaoComponent},
  {path: "verificarEmail", component: VerificarEmailComponent},
  {path: "feed", component:FeedComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
