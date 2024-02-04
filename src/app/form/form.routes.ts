import { Route } from '@angular/router';
import { FormComponent } from './form.component';
import { inject } from '@angular/core';
import { FormService } from '../common/data-access';
import { isEmpty, isNil } from 'lodash';

export const routes: Route[] = [
  {
    path: '',
    component: FormComponent,
    children: [
      {
        path: 'builder',
        canActivate: [() => inject(FormService).questionForm().length > 0],
        loadComponent: () =>
          import('./ui/form-builder').then((r) => r.FormBuilderComponent),
      },
      {
        path: 'answers',
        canActivate: [() => inject(FormService).previewForm().length > 0],
        loadComponent: () =>
          import('./ui/preview').then((r) => r.PreviewComponent),
      },
    ],
  },
];
