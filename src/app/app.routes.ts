import {Routes} from '@angular/router';
import {AppRoutes} from "../core/routes.config";
import {LayoutComponent} from "../components/layout/layout.component";
import {FoldersListComponent} from "../pages/folders-list/folders-list.component";
import {DocumentNewEditComponent} from "../pages/document-new-edit/document-new-edit.component";
import {DocumentsListComponent} from "../pages/documents-list/documents-list.component";
import {DocumentViewComponent} from "../pages/document-view/document-view.component";

export const routes: Routes = [
  {path: AppRoutes.Empty.path, redirectTo: AppRoutes.Dashboard.Folders.path, pathMatch: 'full'},
  {
    path: AppRoutes.Dashboard.Folders.path,
    component: LayoutComponent,
    children: [
      {
        path: AppRoutes.Empty.path,
        component: FoldersListComponent
      },
      {
        path: AppRoutes.Dashboard.Folders.Documents.field,
        component: DocumentsListComponent,
      },
      {
        path: AppRoutes.Dashboard.Folders.NewDocument.field,
        component: DocumentNewEditComponent,
      },
      {
        path: `${AppRoutes.Dashboard.Folders.Documents.field}/${AppRoutes.Dashboard.Folders.Documents.Add.field}`,
        component: DocumentNewEditComponent
      },
      {
        path: `${AppRoutes.Dashboard.Folders.Documents.field}/${AppRoutes.Dashboard.Folders.Documents.Edit.field}`,
        component: DocumentNewEditComponent
      },
      {
        path: `${AppRoutes.Dashboard.Folders.Documents.field}/${AppRoutes.Dashboard.Folders.Documents.View.field}`,
        component: DocumentViewComponent
      }
    ]
  },
  {path: '**', redirectTo: AppRoutes.Dashboard.Folders.path, pathMatch: 'full'}
];
