import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomLayoutComponent } from './custom-layout/custom-layout.component';
import { AuthGuard } from './guards/auth.guard';
import { UnauthenticatedGuard } from './guards/unauthenticated.guard';

const routes: Routes = [
  {
    path: '', component: CustomLayoutComponent, children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./pages/dashboards/dashboard/dashboard.module').then(m => m.DashboardModule),
      },
      {
        path: 'profile',
        loadChildren: () => import('./pages/pages/auth/profile/profile.module').then(m => m.ProfileModule),
      },
      {
        path: 'config',
        loadChildren: () => import('./pages/pages/config/config.module').then(m => m.ConfigModule),
      },
    ],
    canActivateChild: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/pages/auth/login/login.module').then(m => m.LoginModule),
    canActivate: [UnauthenticatedGuard]
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/pages/auth/register/register.module').then(m => m.RegisterModule),
    canActivate: [UnauthenticatedGuard]
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./pages/pages/auth/forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule),
    canActivate: [UnauthenticatedGuard]
  },
  {
    path: 'error-404',
    loadChildren: () => import('./pages/pages/errors/error-404/error-404.module').then(m => m.Error404Module)
  },
  {
    path: 'error-403',
    loadChildren: () => import('./pages/pages/errors/error-403/error-403.module').then(m => m.Error403Module)
  },
  {
    path: 'error-500',
    loadChildren: () => import('./pages/pages/errors/error-500/error-500.module').then(m => m.Error500Module)
  },
  { path: '**', redirectTo: 'error-404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // preloadingStrategy: PreloadAllModules,
    scrollPositionRestoration: 'enabled',
    relativeLinkResolution: 'corrected',
    anchorScrolling: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
