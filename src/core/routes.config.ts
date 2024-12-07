export class AppRoutes {
  public static Empty = class {
    public static path: string = '';
  }

  public static Dashboard = class {
    public static path: string = 'dashboard';

    public static User = class {
      public static get field(): string {
        return 'user';
      }

      public static get path(): string {
        return `${AppRoutes.Dashboard.path}/${AppRoutes.Dashboard.User.field}`;
      }

      public static List = class {
        public static get field(): string {
          return 'list';
        }

        public static get path(): string {
          return `${AppRoutes.Dashboard.User.path}/${AppRoutes.Dashboard.User.List.field}`;
        }
      }

      public static Add = class {
        public static get field(): string {
          return 'add';
        }

        public static get path(): string {
          return `${AppRoutes.Dashboard.User.path}/${AppRoutes.Dashboard.User.Add.field}`;
        }
      }

      public static Edit = class {
        public static get field(): string {
          return ':document/edit';
        }

        public static get path(): string {
          return `${AppRoutes.Dashboard.User.path}/${AppRoutes.Dashboard.User.Edit.field}`;
        }
      }
    }
  }

}
