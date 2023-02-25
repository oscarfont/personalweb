import { Component, HostListener, Input, OnInit } from '@angular/core';
import { AppStateService } from 'src/app/app-state.service';

@Component({
  selector: 'app-highlight-projects',
  templateUrl: './highlight-projects.component.html',
  styleUrls: ['./highlight-projects.component.css']
})
export class HighlightProjectsComponent {

  @Input() background: any;
  isMediumDesktop: boolean;
  isSmallDesktop: boolean;

  constructor(private appStateService: AppStateService) {
    this.isMediumDesktop = this.appStateService.getIsMediumDesktopResolution();
    this.isSmallDesktop = this.appStateService.getIsSmallDesktopResolution();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.isMediumDesktop = this.appStateService.getIsMediumDesktopResolution();
    this.isSmallDesktop = this.appStateService.getIsSmallDesktopResolution();
  }

}
