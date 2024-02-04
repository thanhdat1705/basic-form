import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'form',
    pathMatch: 'full',
  },
  {
    path: 'form',
    loadChildren: () => import('./form/form.routes').then((r) => r.routes),
  },
];
