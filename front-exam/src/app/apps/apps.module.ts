import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// modal
import { ModalModule } from 'angular-custom-modal';

// sortable
import { SortablejsModule } from '@dustfoundation/ngx-sortablejs';

// headlessui
import { MenuModule } from 'headlessui-angular';

// perfect-scrollbar
import { NgScrollbarModule } from 'ngx-scrollbar';

// quill editor
import { QuillModule } from 'ngx-quill';

// fullcalendar
import { FullCalendarModule } from '@fullcalendar/angular';

// tippy
import { NgxTippyModule } from 'ngx-tippy-wrapper';

// datatable
import { DataTableModule } from '@bhplugin/ng-datatable';

import { AddClientComponent } from './add-client/add-client.component';
import { ClientListComponent } from './list-client/list-client.component';
import { InputTextModule } from 'primeng/inputtext';
import { NgSelectModule } from '@ng-select/ng-select';
import { PaginatorModule } from 'primeng/paginator';
import { ButtonModule } from 'primeng/button';
import { TreeTableModule } from 'primeng/treetable';
import { AddCompteComponent } from './add-compte/add-compte.component';

const routes: Routes = [
    { path: 'apps/add-client', component: AddClientComponent, title: 'Client | VRISTO - Multipurpose Tailwind Dashboard Template' },
    { path: 'apps/list-client', component: ClientListComponent, title: 'Client List | VRISTO - Multipurpose Tailwind Dashboard Template' },
    { path: 'apps/add-compte', component: AddCompteComponent, title: 'Compte | VRISTO - Multipurpose Tailwind Dashboard Template' },

];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TreeTableModule,
        PaginatorModule,
        ButtonModule,
        InputTextModule,
        ModalModule,
        SortablejsModule,
        MenuModule,
        NgSelectModule,
        NgScrollbarModule.withConfig({
            visibility: 'hover',
            appearance: 'standard',
        }),
        QuillModule.forRoot(),
        FullCalendarModule,
        NgxTippyModule,
        DataTableModule,
    ],
    declarations: [
        AddClientComponent,
        ClientListComponent,
        AddCompteComponent
    ],
})
export class AppsModule { }
