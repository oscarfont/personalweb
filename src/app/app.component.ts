import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { slideInAnimations } from '../app/animations';
import * as AOS from 'aos';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    slideInAnimations
    // animation triggers go here
  ]
})
export class AppComponent {
  title = 'personalweb';

  ngOnInit() {
    AOS.init();
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }

}
