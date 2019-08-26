import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaPropuestasComponent } from './lista-propuestas/lista-propuestas.component';
import { Page404Component } from './page404/page404.component';

import { AuthGuard } from './guards/auth.guard'
import { MemoCambioComponent } from './memo-cambio/memo-cambio.component';
import { EstadoComponent } from './estado/estado.component';
import { ReglaexposicionComponent } from './reglaexposicion/reglaexposicion.component';
import { ListaEnviadasComponent } from './lista-enviadas/lista-enviadas.component';
import { ListaCompartidasComponent } from './lista-compartidas/lista-compartidas.component';
import { ListaAclaratoriasComponent } from './lista-aclaratorias/lista-aclaratorias.component';
import { ListaAnalisisComponent } from './lista-analisis/lista-analisis.component';
import { LiborComponent } from './libor/libor.component';
import { VerPropuestaComponent } from './ver-propuesta/ver-propuesta.component';
import { ListaAutonomiaComponent } from './lista-autonomia/lista-autonomia.component';
import { VerAutonomiaComponent } from './ver-autonomia/ver-autonomia.component';
import { SignUpComponent } from './users/sign-up/sign-up.component';
import { UserComponent } from './users/user.component';
import { SignInComponent } from './users/sign-in/sign-in.component';
import { HomeComponent } from './home/home.component';
import { AdminCargosComponent } from './admin-cargos/admin-cargos.component';
import { AdminUsercargosComponent } from './admin-usercargos/admin-usercargos.component';
import { AdminCuadroautonomiasComponent } from './admin-cuadroautonomias/admin-cuadroautonomias.component';
import { VerPreguntaComponent } from './ver-pregunta/ver-pregunta.component';
import { ListaUsuariosComponent } from './users/lista-usuarios/lista-usuarios.component';
import { ListaRevisorComponent } from './lista-revisor/lista-revisor.component';
import { VerRevisorComponent } from './ver-revisor/ver-revisor.component';

// const routes: Routes = [
//   { path: '', redirectTo: 'user/login', pathMatch: 'full' },
//   { path: 'user/login', component: LoginComponent },
//   { path: 'user/register', component: RegisterComponent },
//   { path: 'Principal', component: ListaPropuestasComponent, canActivate: [AuthGuard] },
//   { path: 'Propuesta', component: PropuestaComponent, canActivate: [AuthGuard] },
//   { path: 'Propuesta/:id', component: PropuestaComponent, canActivate: [AuthGuard] },
//   { path: 'Compartidas', component: ListaCompartidasComponent, canActivate: [AuthGuard] },
//   { path: 'Enviadas', component: ListaEnviadasComponent, canActivate: [AuthGuard] },
//   { path: 'Aclaratorias', component: ListaAclaratoriasComponent, canActivate: [AuthGuard] },
//   { path: 'Analisis-Revision/:id', component: AnalisisRevisionComponent, canActivate: [AuthGuard] },
//   { path: 'Ver-Propuesta/:id', component: VerPropuestaComponent, canActivate: [AuthGuard] },
//   { path: 'Ver-Autonomia/:id', component: VerAutonomiaComponent, canActivate: [AuthGuard] },
//   { path: 'Autonomia', component: ListaAutonomiaComponent, canActivate: [AuthGuard] },
//   { path: 'Prueba', component: PruebaComponent },
//   { path: 'Libor', component: LiborComponent },
//   { path: 'Preguntas', component: ListaPreguntasComponent, canActivate: [AuthGuard] },
//   { path: 'Memo', component: MemoCambioComponent, canActivate: [AuthGuard] },
//   { path: 'Estados', component: EstadoComponent, canActivate: [AuthGuard] },
//   { path: 'Exposicion', component: ReglaexposicionComponent, canActivate: [AuthGuard] },
//   { path: 'user/profile', component: ProfileComponent, canActivate: [AuthGuard] },
//   { path: '**', component: Page404Component }
// ];

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'signup', component: UserComponent, children: [{ path: '', component: SignUpComponent }] },
  { path: 'login', component: UserComponent, children: [{ path: '', component: SignInComponent }] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'lista-propuestas', component: HomeComponent, children: [{ path: '', component: ListaPropuestasComponent }], canActivate: [AuthGuard] },
  { path: 'lista-aclaratorias', component: HomeComponent, children: [{ path: '', component: ListaAclaratoriasComponent }], canActivate: [AuthGuard] },
  { path: 'lista-enviadas', component: HomeComponent, children: [{ path: '', component: ListaEnviadasComponent }], canActivate: [AuthGuard] },
  { path: 'lista-compartidas', component: HomeComponent, children: [{ path: '', component: ListaCompartidasComponent }], canActivate: [AuthGuard] },
  { path: 'lista-autonomia', component: HomeComponent, children: [{ path: '', component: ListaAutonomiaComponent }], canActivate: [AuthGuard] },
  { path: 'lista-analisis', component: HomeComponent, children: [{ path: '', component: ListaAnalisisComponent }], canActivate: [AuthGuard] },
  { path: 'lista-revisor', component: HomeComponent, children: [{ path: '', component: ListaRevisorComponent }], canActivate: [AuthGuard] },
  { path: 'ver-propuesta/:id', component: HomeComponent, children: [{ path: '', component: VerPropuestaComponent }], canActivate: [AuthGuard] },
  { path: 'ver-autonomia/:id', component: HomeComponent, children: [{ path: '', component: VerAutonomiaComponent }], canActivate: [AuthGuard] },
  { path: 'ver-pregunta/:id', component: HomeComponent, children: [{ path: '', component: VerPreguntaComponent }], canActivate: [AuthGuard] },
  { path: 'ver-revisor/:id', component: HomeComponent, children: [{ path: '', component: VerRevisorComponent }], canActivate: [AuthGuard] },
  { path: 'admin-cargos', component: HomeComponent, children: [{ path: '', component: AdminCargosComponent }], canActivate: [AuthGuard] },
  { path: 'admin-usercargos', component: HomeComponent, children: [{ path: '', component: AdminUsercargosComponent }], canActivate: [AuthGuard] },
  { path: 'admin-cuadroautonomias', component: HomeComponent, children: [{ path: '', component: AdminCuadroautonomiasComponent }], canActivate: [AuthGuard] },
  { path: 'memo-cambio', component: HomeComponent, children: [{ path: '', component: MemoCambioComponent }], canActivate: [AuthGuard] },
  { path: 'estados', component: HomeComponent, children: [{ path: '', component: EstadoComponent,}], canActivate: [AuthGuard] },
  { path: 'libor', component: HomeComponent, children: [{ path: '', component: LiborComponent }], canActivate: [AuthGuard] },
  { path: 'lista-usuarios', component: HomeComponent, children: [{ path: '', component: ListaUsuariosComponent }] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
