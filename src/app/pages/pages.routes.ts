import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { PagesComponent } from './pages.component';
import { ProgressComponent } from './progress/progress.component';
import { AccoutSettingsComponent } from './accout-settings/accout-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
// Guard
import { LoginGuardGuard } from '../services/guards/login-guard.guard';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [LoginGuardGuard],
        children: [
            {path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard'}},
            {path: 'progress', component: ProgressComponent, data: { titulo: 'Progress'}},
            {path: 'graficas1', component: Graficas1Component, data: { titulo: 'Graficas'}},
            {path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas'}},
            {path: 'rxjs', component: RxjsComponent, data: { titulo: 'Rxjs'}},
            {path: 'account-settings', component: AccoutSettingsComponent, data: { titulo: 'Ajustes del Tema'}},
            // Mantenimiento
            {path: 'usuarios', component: UsuariosComponent, data: { titulo: 'Mantenimiento de usuarios'}},
            {path: 'perfil', component: ProfileComponent, data: { titulo: 'Perfil de usuario'}},
            {path: '', redirectTo: '/dashboard', pathMatch: 'full'}
        ]
    }
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );