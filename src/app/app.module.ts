import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { ReglaexposicionComponent } from './reglaexposicion/reglaexposicion.component';
import { CurvaliborComponent } from './curvalibor/curvalibor.component';
import { LiborComponent } from './libor/libor.component';
import { EstadoComponent } from './estado/estado.component';
import { Page404Component } from './page404/page404.component';
import { ListaPropuestasComponent } from './lista-propuestas/lista-propuestas.component';
import { ListaEnviadasComponent } from './lista-enviadas/lista-enviadas.component';

import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { MemoCambioComponent } from './memo-cambio/memo-cambio.component';
import { MensajeComponent } from './mensaje/mensaje.component';
import { PropuestaService } from './services/propuesta.service';
import { UnidadService } from './services/unidad.service';
import { RiesgoService } from './services/riesgo.service';
import { FacilidadService } from './services/facilidad.service';
import { TipopropuestaService } from './services/tipopropuesta.service';
import { TipofacilidadService } from './services/tipofacilidad.service';
import { SubtipopropuestaService } from './services/subtipopropuesta.service';
import { SubtipofacilidadService } from './services/subtipofacilidad.service';
import { ReglaexposicionService } from './services/reglaexposicion.service';
import { ListaCompartidasComponent } from './lista-compartidas/lista-compartidas.component';
import { ListaAclaratoriasComponent } from './lista-aclaratorias/lista-aclaratorias.component';
import { ListaAnalisisComponent } from './lista-analisis/lista-analisis.component';
import { VerPropuestaComponent } from './ver-propuesta/ver-propuesta.component';
import { ListaAutonomiaComponent } from './lista-autonomia/lista-autonomia.component';
import { VerAutonomiaComponent } from './ver-autonomia/ver-autonomia.component';
import { VerPreguntaComponent } from './ver-pregunta/ver-pregunta.component';
import { SignUpComponent } from './users/sign-up/sign-up.component';
import { SignInComponent } from './users/sign-in/sign-in.component';
import { UserComponent } from './users/user.component';
import { HomeComponent } from './home/home.component';
import { LocalStorageService } from './services/local-storage.service';
import { CurrencyMaskModule } from "ng2-currency-mask";

import { DialogGarantiasComponent } from './dialog-garantias/dialog-garantias.component';
import { DialogPropositosComponent } from './dialog-propositos/dialog-propositos.component';
import { DialogFianzaComponent } from './dialog-fianza/dialog-fianza.component';
import { AdminCargosComponent } from './admin-cargos/admin-cargos.component';
import { AdminUsercargosComponent } from './admin-usercargos/admin-usercargos.component';
import { AdminCuadroautonomiasComponent } from './admin-cuadroautonomias/admin-cuadroautonomias.component';
import { DialogCompartirComponent } from './dialog-compartir/dialog-compartir.component';
import { ListaUsuariosComponent } from './users/lista-usuarios/lista-usuarios.component';
import { ListaRevisorComponent } from './lista-revisor/lista-revisor.component';
import { VerRevisorComponent } from './ver-revisor/ver-revisor.component';
import { ServicesDataService } from './services-data-central/services-data.service';
import { DialogAutorizarComponent } from './dialog-autorizar/dialog-autorizar.component';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    ReglaexposicionComponent ,
    CurvaliborComponent,
    EstadoComponent,
    Page404Component,
    MemoCambioComponent,
    MensajeComponent,
    DialogPropositosComponent,
    DialogGarantiasComponent,
    DialogFianzaComponent,
    DialogCompartirComponent,
    DialogAutorizarComponent,
    ListaPropuestasComponent,
    ListaEnviadasComponent,
    ListaCompartidasComponent,
    ListaAclaratoriasComponent,
    ListaAnalisisComponent,
    ListaAutonomiaComponent,
    ListaUsuariosComponent,
    ListaRevisorComponent,
    SignUpComponent,
    SignInComponent,
    LiborComponent,
    UserComponent,
    HomeComponent,
    AdminCargosComponent,
    AdminUsercargosComponent,
    AdminCuadroautonomiasComponent,
    VerPropuestaComponent,
    VerAutonomiaComponent,
    VerPreguntaComponent,
    VerRevisorComponent
  ],
  entryComponents: [
    MensajeComponent,
    DialogPropositosComponent,
    DialogGarantiasComponent,
    DialogFianzaComponent,
    DialogCompartirComponent,
    DialogAutorizarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CurrencyMaskModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    AuthService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi:true
    },
    UnidadService,
    RiesgoService,
    FacilidadService,
    PropuestaService,
    TipopropuestaService,
    SubtipopropuestaService,
    SubtipofacilidadService,
    ReglaexposicionService,
    TipofacilidadService,
    LocalStorageService,
    ServicesDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
