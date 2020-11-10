import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// RUTAS
import { APP_ROUTES } from './app.routes';

// Modulos
import { PagesModule } from './pages/pages.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
/* import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { Graficas1Component } from './pages/graficas1/graficas1.component';
import { PagesComponent } from './pages/pages.component'; */
/* import { HeaderComponent } from './shared/header/header.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { BreadcrumbsComponent } from './shared/breadcrumbs/breadcrumbs.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component'; */

// Servicios
import { ServiceModule } from './services/service.module';
import { RegisterComponent } from './login/register/register.component';





@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent
    /* DashboardComponent,
    ProgressComponent,
    Graficas1Component,
    PagesComponent, */
    /* HeaderComponent,
    SidebarComponent,
    BreadcrumbsComponent,
    NopagefoundComponent */
  ],
  imports: [
    BrowserModule,
    PagesModule,   // Importamos el modulo de los componentes Pages
    APP_ROUTES,     // Traemos las rutas de los componentes Pages
    FormsModule,
    ReactiveFormsModule,
    ServiceModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
