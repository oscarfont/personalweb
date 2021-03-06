import { Component, OnInit, HostListener } from '@angular/core';
import { AppStateService } from '../app-state.service';
import { faHome, faFolderOpen, faBlog, faInbox } from '@fortawesome/free-solid-svg-icons';
import { Router, Route } from '@angular/router';

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
  possibleRoutes = new Array();
  optionsMap = new Map();

  constructor(private appStateService : AppStateService, private router : Router) {
    // get all available routes 
    this.possibleRoutes = this.getAvailableRoutes('',this.router.config);
  }

  getAvailableRoutes(parent: String, config: Route[]){
    let routeArray = new Array();
    let path = "";
    for (let i = 0; i < config.length; i++) {
      const route = config[i];
      if(route.path == ""){path = "home"}else if(route.path == "**"){continue;}else{path = route.path};
      routeArray.push(parent + '/' + path);
      if (route.children) {
        const currentPath = route.path ? parent + '/' + route.path : parent;
        this.getAvailableRoutes(currentPath, route.children);
      }
    }
    
    return routeArray;
  }

  initializeOptionMap(currRoute : String){
    let routeId = currRoute.replace('/','');
    routeId = routeId.concat("-tab");
    if(document.getElementById(routeId).className == "nav-link active"){
      this.optionsMap.set(currRoute,1);
    }else{
      this.optionsMap.set(currRoute,0);
    }
  }

  // get active tab
  getActiveTab(optionsMap : Map<String, Number>){
    for (const key in optionsMap.keys) {
      if(optionsMap.get(key) == 1){
        return key;
      }
    }
    return "/home";
  }

  // change activated tab
  changeActiveTab(router: Router, optionsMap : Map<String, Number>){

    // deactivate wrong tab
    let activeTabName = this.getActiveTab(optionsMap).replace('/','');
    let activeTabId = activeTabName.concat("-tab"); 
    // unactivate tab
    document.getElementById(activeTabId).className = "nav-link";
    // update map
    optionsMap.set(activeTabName,0);

    // get new to active tab id
    let path = window.location.href;
    let urlParts = path.split('#');
    let location = urlParts[1];
    let newActiveRouteId = location.replace('/','');
    newActiveRouteId = newActiveRouteId.concat("-tab");

    // change activated tab
    document.getElementById(newActiveRouteId).className = "nav-link active";
    // update map
    optionsMap.set(router.url,1);
    
  }

  // check activated route
  checkCurrentRoute(router: Router, optionsMap : Map<String, Number>){
    let path = window.location.href;
    let location = "";
    if(path.includes('#')){
      let urlParts = path.split('#');
      location = urlParts[1];
      if(location == '/'){location = "/home"};
    }else{
      location = "/home";
    }
    return optionsMap.get(location) == 1;
  }

  ngOnInit(): void {
    // adjust navbar
    if(this.appStateService.getIsMobileResolution()){
      this.changeNavBarMobile();
    }else{
      this.changeNavBarToDesktop();
    }
    // initialize routes map
    for(let i = 0; i < this.possibleRoutes.length; i++){
      this.initializeOptionMap(this.possibleRoutes[i]);
    }
    // check active route
    if(this.optionsMap.size > 0 && !this.checkCurrentRoute(this.router,this.optionsMap)){
      // if wrong => change
      this.changeActiveTab(this.router,this.optionsMap);
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    /*console.log(this.appStateService.getIsMobileResolution());*/
    if(this.appStateService.getIsMobileResolution()){
      this.changeNavBarMobile();
    }else{
      this.changeNavBarToDesktop();
    }
  }

  onClick(element){
    let lastOption = document.getElementById("navbar-div").querySelector('[class="nav-link active"]');
    lastOption.className = "nav-link";
    let option = document.getElementById(element);
    option.className = "nav-link active";
  }

  changeNavBarMobile() {
    let homeOption = document.getElementById("home-tab");
    let homeIcon = document.getElementById("home-icon");
    homeIcon.style.fontSize = "large";
    homeOption.style.fontSize = "medium";
    homeOption.style.flexDirection = "column";
    let portfolioOption = document.getElementById("portfolio-tab");
    let portfolioIcon = document.getElementById("portfolio-icon");
    portfolioIcon.style.fontSize = "large";
    portfolioOption.style.fontSize = "medium";
    portfolioOption.style.flexDirection = "column";
    let blogOption = document.getElementById("blog-tab");
    let blogIcon = document.getElementById("blog-icon");
    blogIcon.style.fontSize = "large";
    blogOption.style.fontSize = "medium";
    blogOption.style.flexDirection = "column";
    let contactOption = document.getElementById("contact-tab");
    let contactIcon = document.getElementById("contact-icon");
    contactIcon.style.fontSize = "large";
    contactOption.style.fontSize = "medium";
    contactOption.style.flexDirection = "column";
  }

  changeNavBarToDesktop(){
    let homeOption = document.getElementById("home-tab");
    let homeIcon = document.getElementById("home-icon");
    homeIcon.style.fontSize = "x-large";
    homeOption.style.fontSize = "large";
    homeOption.style.flexDirection = "row";
    let portfolioOption = document.getElementById("portfolio-tab");
    let portfolioIcon = document.getElementById("portfolio-icon");
    portfolioIcon.style.fontSize = "x-large";
    portfolioOption.style.fontSize = "large";
    portfolioOption.style.flexDirection = "row";
    let blogOption = document.getElementById("blog-tab");
    let blogIcon = document.getElementById("blog-icon");
    blogIcon.style.fontSize = "x-large";
    blogOption.style.fontSize = "large";
    blogOption.style.flexDirection = "row";
    let contactOption = document.getElementById("contact-tab");
    let contactIcon = document.getElementById("contact-icon");
    contactIcon.style.fontSize = "x-large";
    contactOption.style.fontSize = "large";
    contactOption.style.flexDirection = "row";
  }

}
