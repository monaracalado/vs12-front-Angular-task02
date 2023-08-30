import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContatoComponent } from './contato/contato.component';
import { GaleriaComponent } from './galeria/galeria.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { VeterinariosComponent } from './veterinarios/veterinarios.component';
import { LoginComponent } from './login/login.component';
import { AgendaComponent } from './agenda/agenda.component';
import { ServicosComponent } from './servicos/servicos.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'contato', component: ContatoComponent },
  { path: 'galeria', component: GaleriaComponent },
  { path: 'veterinario', component: VeterinariosComponent },
  { path: 'login', component: LoginComponent },
  { path: 'servicos', component: ServicosComponent },
  { path: 'agenda', component: AgendaComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
