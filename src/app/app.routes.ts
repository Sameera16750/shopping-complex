// from angular router
import {Routes} from '@angular/router';

// all app routs
export const routes: Routes = [
  {
    path:'',
    redirectTo:'admin',
    pathMatch:"full",
  },
  {
    path: 'admin',
    loadComponent: () => import('./features/admin/layout/main-layout/main-layout.component').then(mod => mod.MainLayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./features/admin/pages/dashboard/dashboard.component').then(mod => mod.DashboardComponent),
      },
      {
        path: 'spaces',
        loadComponent: () => import('./features/admin/pages/spaces/spaces.component').then(mod => mod.SpacesComponent),
      },
      {
        path: 'store-categories',
        loadComponent: () => import('./features/admin/pages/store-categories/store-categories.component').then(mod => mod.StoreCategoriesComponent),
      },
      {
        path: 'stores',
        loadComponent: () => import('./features/admin/pages/stores/stores.component').then(mod => mod.StoresComponent),
      },
      {
        path: 'store-owners',
        loadComponent: () => import('./features/admin/pages/store-owners/store-owners.component').then(mod => mod.StoreOwnersComponent),
      },
      {
        path: 'contractors',
        loadComponent: () => import('./features/admin/pages/contractors/contractors.component').then(mod => mod.ContractorsComponent),
      },
      {
        path: 'maintenance',
        loadComponent: () => import('./features/admin/pages/maintenance/maintenance.component').then(mod => mod.MaintenanceComponent),
      },

    ]
  }
];
