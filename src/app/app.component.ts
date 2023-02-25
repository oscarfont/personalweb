import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { slideInAnimations } from '../app/animations';
import * as AOS from 'aos';
import { Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    slideInAnimations
    // animation triggers go here
  ]
})
export class AppComponent implements OnInit {
  title = 'personalweb';

  constructor(
    private metaService: Meta,
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngOnInit() {
    AOS.init();
    this.metaService.updateTag({
      name: 'viewport',
      content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0'
    }, 'name=viewport');
    this.metaService.addTags([
      {
        description: 'Welcome to my personal porftolio plus blog site! Find my latest work experiences in the tech industry and my best projects.'
      }
    ]);
    this.document.documentElement.lang = 'en';
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }

}
