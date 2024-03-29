import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';

// Rutas
import { PAGES_ROUTES } from './pages.routes';

// Componentes
import { SharedModule } from '../shared/shared.module';

// ng2 -charts
import { ChartsModule } from 'ng2-charts';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { ProgressComponent } from './progress/progress.component';
// Pipe Modulo
import { PipesModule } from '../pipes/pipes.module';




// Temporal
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { GraficoDonaComponent } from '../components/grafico-dona/grafico-dona.component';
import { AccoutSettingsComponent } from './accout-settings/accout-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { CommonModule } from '@angular/common';
import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';


@NgModule({
    declarations: [
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        PagesComponent,
        IncrementadorComponent,
        GraficoDonaComponent,
        AccoutSettingsComponent,
        PromesasComponent,
        RxjsComponent,
        ProfileComponent,
        UsuariosComponent,
        ModalUploadComponent
    ],
    exports: [
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
    ],
    imports: [
        SharedModule,  // Importamos el modulo de los componentes Shared
        PAGES_ROUTES,   // Traemos las rutas de los componentes Pages
        FormsModule,
        ChartsModule,
        PipesModule,
        CommonModule
    ]
})

export class PagesModule{}