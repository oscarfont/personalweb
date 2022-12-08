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
  navbarClass: string;
  authClass: string;

  constructor(private appStateService: AppStateService, private router: Router, private modalService: NgbModal) { }

  ngOnInit(): void {
    // adjust navbar
    this.navbarClass = 'fixed-top';
    if (this.appStateService.getIsMobileResolution()) {
      this.changeNavBarMobile();
    } else {
      this.changeNavBarToDesktop();
    }
  }

  getCurrentRoute(): string {
    return this.router.url;
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
    this.changeOptionResponsive("portfolio", "column");
    this.changeOptionResponsive("blog", "column");
    this.changeOptionResponsive("contact", "column");
    this.changeOptionResponsive("user", "column");
    this.authClass = 'col';
  }

  changeNavBarToDesktop() { //row
    const fakeOption = document.getElementById("fake-option");
    fakeOption.style.display = 'block';
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
