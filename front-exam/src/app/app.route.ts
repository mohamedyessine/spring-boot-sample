import { Routes } from '@angular/router';

// dashboard
import { IndexComponent } from './index';
import { AnalyticsComponent } from './analytics';
import { FinanceComponent } from './finance';
import { CryptoComponent } from './crypto';

// layouts
import { AppLayout } from './layouts/app-layout';
import { AuthLayout } from './layouts/auth-layout';


export const routes: Routes = [
    {
        path: '',
        component: AppLayout,
        children: [
            // dashboard
            { path: '', component: IndexComponent, title: 'Sales Admin | VRISTO - Multipurpose Tailwind Dashboard Template' },
            { path: 'analytics', component: AnalyticsComponent, title: 'Analytics Admin | VRISTO - Multipurpose Tailwind Dashboard Template' },
            { path: 'finance', component: FinanceComponent, title: 'Finance Admin | VRISTO - Multipurpose Tailwind Dashboard Template' },
            { path: 'crypto', component: CryptoComponent, title: 'Crypto Admin | VRISTO - Multipurpose Tailwind Dashboard Template' },

            //apps
            { path: '', loadChildren: () => import('./apps/apps.module').then((d) => d.AppsModule) },

        ],
    },

];
