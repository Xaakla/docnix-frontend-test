import {Component} from '@angular/core';
import {AppRoutes} from "../../core/routes.config";
import {RouteService} from "../../services/route.service";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  constructor(
    private _routeService: RouteService
  ) {
  }

  public gotoUsersList() {
    this._routeService.go([AppRoutes.Dashboard.Folders.path]);
  }
}
