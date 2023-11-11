// from angular router
import { Routes } from '@angular/router';

// all app routs
export const routes: Routes = [
  {
    path:'admin',loadComponent:()=>import('./features/admin/layout/main-layout/main-layout.component').then(mod=>mod.MainLayoutComponent)
  }
];
