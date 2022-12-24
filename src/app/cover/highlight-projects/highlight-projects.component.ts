import { Component, HostListener, Input, OnInit } from '@angular/core';
import { AppStateService } from 'src/app/app-state.service';

@Component({
  selector: 'app-highlight-projects',
  templateUrl: './highlight-projects.component.html',
  styleUrls: ['./highlight-projects.component.css']
})
export class HighlightProjectsComponent implements OnInit {

  @Input() background: any;
  isMobile: boolean;

  constructor(private appStateService: AppStateService) {
    this.isMobile = this.appStateService.getIsMediumDesktopResolution();
  }

  ngOnInit(): void {
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.isMobile = this.appStateService.getIsMediumDesktopResolution();
  }

}
