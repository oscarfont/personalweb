import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavbarsyncService {

  possibleRoutes = new Array();
  optionsMap = new Map();

  constructor(private router: Router) {
    // get all available routes
    this.possibleRoutes = this.getAvailableRoutes('', this.router.config);
  }

  private getAvailableRoutes(parent: String, config: Route[]) {
    let routeArray = new Array();
    let path = "";
    for (let i = 0; i < config.length; i++) {
      const route = config[i];
      if (route.path == "") { path = "home" } else if (route.path == "**" || route.path.includes("detail") || route.path.includes("newpost")) { continue; } else { path = route.path };
      routeArray.push(parent + '/' + path);
      if (route.children) {
        const currentPath = route.path ? parent + '/' + route.path : parent;
        this.getAvailableRoutes(currentPath, route.children);
      }
    }
    return routeArray;
  }

  private initializeOptionMap(currRoute: String) {
    const routesNotInNavBar = ['notfound-tab'];
    let routeId = currRoute.replace('/', '');
    routeId = routeId.concat("-tab");
    if (!routesNotInNavBar.includes(routeId) && document.getElementById(routeId).className == "nav-link active") {
      this.optionsMap.set(currRoute, 1);
    } else {
      this.optionsMap.set(currRoute, 0);
    }
  }

  // get active tab
  private getActiveTab(optionsMap: Map<String, Number>) {
    for (const key in optionsMap.keys) {
      if (optionsMap.get(key) == 1) {
        return key;
      }
    }
    return "/home";
  }

  // change activated tab
  private changeActiveTab(router: Router, optionsMap: Map<String, Number>) {

    // deactivate wrong tab
    let activeTabName = this.getActiveTab(optionsMap).replace('/', '');
    let activeTabId = activeTabName.concat("-tab");
    // unactivate tab
    document.getElementById(activeTabId).className = "nav-link";
    // update map
    optionsMap.set(activeTabName, 0);

    // get new to active tab id
    let path = window.location.href;
    let urlParts = path.split('#');
    let location = urlParts[1];
    let newActiveRouteId = location.replace('/', '');
    newActiveRouteId = newActiveRouteId.concat("-tab");

    // change activated tab
    document.getElementById(newActiveRouteId).className = "nav-link active";
    // update map
    optionsMap.set(router.url, 1);

  }

  // check activated route
  private checkCurrentRoute(router: Router, optionsMap: Map<String, Number>) {
    let path = window.location.href;
    let location = "";
    if (path.includes('#')) {
      let urlParts = path.split('#');
      location = urlParts[1];
      if (location == '/') { location = "/home" };
    } else {
      location = "/home";
    }

    if (optionsMap.get(location) != undefined) {
      return optionsMap.get(location) == 1;
    } else {
      return true;
    }
  }

  initNavBar() {
    // initialize routes map
    for (let i = 0; i < this.possibleRoutes.length; i++) {
      this.initializeOptionMap(this.possibleRoutes[i]);
    }
  }

  sync() {
    // check active route
    if (this.optionsMap.size > 0 && !this.checkCurrentRoute(this.router, this.optionsMap)) {
      // if wrong => change
      this.changeActiveTab(this.router, this.optionsMap);
    }
  }
}
