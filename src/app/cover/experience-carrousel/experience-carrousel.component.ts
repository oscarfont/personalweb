import { Component, HostListener, Input, OnInit } from '@angular/core';
import { AppStateService } from 'src/app/app-state.service';

@Component({
  selector: 'app-experience-carrousel',
  templateUrl: './experience-carrousel.component.html',
  styleUrls: ['./experience-carrousel.component.css']
})
export class ExperienceCarrouselComponent {

  @Input() background: any;
  isMobile: boolean;

  constructor(private appStateService: AppStateService) {
    this.isMobile = this.appStateService.getIsMobileResolution();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.isMobile = this.appStateService.getIsMobileResolution();
  }

}
