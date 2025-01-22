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
            { path: '', component: IndexComponent, title: 'Sales Admin | BANK MANAGEMENT' },
            { path: 'analytics', component: AnalyticsComponent, title: 'Analytics Admin | BANK MANAGEMENT' },
            { path: 'finance', component: FinanceComponent, title: 'Finance Admin | BANK MANAGEMENT' },
            { path: 'crypto', component: CryptoComponent, title: 'Crypto Admin | BANK MANAGEMENT' },

            //apps
            { path: '', loadChildren: () => import('./apps/apps.module').then((d) => d.AppsModule) },

        ],
    },

];
