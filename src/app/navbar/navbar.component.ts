import { Component, OnInit, HostListener } from '@angular/core';
import { AppStateService } from '../app-state.service';
import { faHome, faFolderOpen, faBlog, faInbox, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { Router, Route } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthComponent } from '../auth/auth.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  homeIcon = faHome;
  folderIcon = faFolderOpen;
  blogIcon = faBlog;
  inboxIcon = faInbox;
  userIcon = faUserCircle;
  possibleRoutes = new Array();
  optionsMap = new Map();
  navbarClass: string;
  authClass: string;

  constructor(private appStateService: AppStateService, private router: Router, private modalService: NgbModal) {
    // get all available routes
    this.possibleRoutes = this.getAvailableRoutes('', this.router.config);
  }

  getAvailableRoutes(parent: String, config: Route[]) {
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

  initializeOptionMap(currRoute: String) {
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
  getActiveTab(optionsMap: Map<String, Number>) {
    for (const key in optionsMap.keys) {
      if (optionsMap.get(key) == 1) {
        return key;
      }
    }
    return "/home";
  }

  // change activated tab
  changeActiveTab(router: Router, optionsMap: Map<String, Number>) {

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
  checkCurrentRoute(router: Router, optionsMap: Map<String, Number>) {
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

  ngOnInit(): void {
    // adjust navbar
    this.navbarClass = 'fixed-top';
    if (this.appStateService.getIsMobileResolution()) {
      this.changeNavBarMobile();
    } else {
      this.changeNavBarToDesktop();
    }
    // initialize routes map
    for (let i = 0; i < this.possibleRoutes.length; i++) {
      this.initializeOptionMap(this.possibleRoutes[i]);
    }
    // check active route
    if (this.optionsMap.size > 0 && !this.checkCurrentRoute(this.router, this.optionsMap)) {
      // if wrong => change
      this.changeActiveTab(this.router, this.optionsMap);
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    /*console.log(this.appStateService.getIsMobileResolution());*/
    this.navbarClass = 'fixed-top';
    if (this.appStateService.getIsMobileResolution()) {
      this.changeNavBarMobile();
    } else {
      this.changeNavBarToDesktop();
    }
  }

  onClick(element) {
    let lastOption = document.getElementById("navbar-div").querySelector('[class="nav-link active"]');
    lastOption.className = "nav-link";
    let option = document.getElementById(element);
    option.className = "nav-link active";
  }

  changeOptionResponsive(iconName: string, dir: string, name?: string) {
    const iconOption = document.getElementById(iconName + "-tab");
    const icon = document.getElementById(iconName + "-icon");
    const iconTitle = document.getElementById(iconName + "-title");
    icon.style.fontSize = "large";
    iconOption.style.fontSize = "medium";
    iconOption.style.flexDirection = dir;
    iconTitle.textContent = name ? name : "";
  }

  changeNavBarMobile() { //column
    const fakeOption = document.getElementById("fake-option");
    fakeOption.style.display = 'none';
    this.changeOptionResponsive("home", "column");
    this.changeOptionResponsive("portfolio", "column");
    this.changeOptionResponsive("blog", "column");
    this.changeOptionResponsive("contact", "column");
    this.changeOptionResponsive("user", "column");
    this.authClass = 'col';
  }

  changeNavBarToDesktop() { //row
    const fakeOption = document.getElementById("fake-option");
    fakeOption.style.display = 'block';
    this.changeOptionResponsive("home", "row", "Home");
    this.changeOptionResponsive("portfolio", "row", "Portflio");
    this.changeOptionResponsive("blog", "row", "Blog");
    this.changeOptionResponsive("contact", "row", "Contact");
    this.changeOptionResponsive("user", "row");
    this.authClass = 'col-1';
  }

  openAuthModal() {
    const modalRef = this.modalService.open(AuthComponent,
      {
        size: 'lg',
        centered: true,
        scrollable: true
      });
  }

}
