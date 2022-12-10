import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { slideInAnimations } from '../app/animations';
import * as AOS from 'aos';
import { Meta } from '@angular/platform-browser';

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

  constructor(
    private metaService: Meta
  ) { }

  ngOnInit() {
    AOS.init();
    this.metaService.updateTag({
      name: 'viewport',
      content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
    }, 'name=viewport');
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }

}
