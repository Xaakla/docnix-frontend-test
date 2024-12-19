export class AppRoutes {
  public static Empty = class {
    public static path: string = '';
  }

  public static Dashboard = class {
    public static path: string = 'dashboard';

    public static Folders = class {
      public static get field(): string {
        return 'folders';
      }

      public static get path(): string {
        return `${AppRoutes.Dashboard.path}/${AppRoutes.Dashboard.Folders.field}`;
      }

      public static NewDocument = class {
        public static get field(): string {
          return 'documents/add';
        }

        public static get path(): string {
          return `${AppRoutes.Dashboard.Folders.path}/${AppRoutes.Dashboard.Folders.NewDocument.field}`;
        }
      }

      public static Documents = class {
        public static get field(): string {
          return ':acronym/documents';
        }

        public static get path(): string {
          return `${AppRoutes.Dashboard.Folders.path}/${AppRoutes.Dashboard.Folders.Documents.field}`;
        }

        public static Add = class {
          public static get field(): string {
            return 'add';
          }

          public static get path(): string {
            return `${AppRoutes.Dashboard.Folders.Documents.path}/${AppRoutes.Dashboard.Folders.Documents.Add.field}`;
          }
        }

        public static Edit = class {
          public static get field(): string {
            return ':documentId/edit';
          }

          public static get path(): string {
            return `${AppRoutes.Dashboard.Folders.Documents.path}/${AppRoutes.Dashboard.Folders.Documents.Edit.field}`;
          }
        }
      }
    }
  }

}
