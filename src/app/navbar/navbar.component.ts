import { Component, OnInit, HostListener } from '@angular/core';
import { AppStateService } from '../app-state.service';
import { faHome, faFolderOpen, faBlog, faInbox } from '@fortawesome/free-solid-svg-icons';

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

  constructor(private appStateService : AppStateService) { }

  ngOnInit(): void {
    if(this.appStateService.getIsMobileResolution()){
      this.changeNavBarMobile();
    }else{
      this.changeNavBarToDesktop();
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
