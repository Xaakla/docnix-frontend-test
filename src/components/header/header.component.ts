import {Component} from '@angular/core';
import {RouteService} from "../../services/route.service";
import {AppRoutes} from "../../core/routes.config";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(private _routeService: RouteService) {
  }

  public gotoNewUser() {
    this._routeService.go([AppRoutes.Dashboard.User.Add.path]);
  }
}
