import {Injectable, isDevMode} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Injectable({providedIn: "root"})
export class RouteService {

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  go(routes: string[], pathVariables: object = {}, queryParams?: object, config?: ConfigRoute) {
    // Get to string
    let path: string = routes.join('/');

    // Replace paths variable
    Object.keys(pathVariables).forEach(key => {
      // @ts-ignore
      path = path.replace(':'.concat(key), pathVariables[key]);
    });

    // noinspection JSIgnoredPromiseFromCall
    this.router.navigate([path], {queryParams});

    if (isDevMode()) {
      console.log('%c path: ' + path, 'background: #f2f2f2; color: #0080d0; padding:5px; line-height: 25px');
    }
  }

  updateQueryParams(queryParams: any, complete = () => {
  }) {
    this.router.navigate(
      [],
      {
        relativeTo: this.activatedRoute,
        queryParams,
        queryParamsHandling: 'merge', // remove to replace all query params by provided
      }).then(r => {
    }).catch(err => console.error(err)).finally(() => complete());
  }
}

export interface ConfigRoute {
  keepParam?: boolean;
}
