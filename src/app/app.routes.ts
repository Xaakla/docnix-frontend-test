import { Routes } from '@angular/router';
import {AppRoutes} from "../core/routes.config";
import {LayoutComponent} from "../components/layout/layout.component";
import {UsersListComponent} from "../pages/users-list/users-list.component";
import {UserNewEditComponent} from "../pages/user-new-edit/user-new-edit.component";

export const routes: Routes = [
  {path: AppRoutes.Empty.path, redirectTo: AppRoutes.Dashboard.User.List.path, pathMatch: 'full'},
  {
    path: AppRoutes.Dashboard.User.path,
    component: LayoutComponent,
    children: [
      {
        path: AppRoutes.Dashboard.User.List.field,
        component: UsersListComponent
      },
      {
        path: AppRoutes.Dashboard.User.Add.field,
        component: UserNewEditComponent
      },
      {
        path: AppRoutes.Dashboard.User.Edit.field,
        component: UserNewEditComponent
      }
    ]

  },
  {path: '**', redirectTo: AppRoutes.Dashboard.User.List.path, pathMatch: 'full'}
];
