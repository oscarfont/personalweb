import { Component, HostListener, Input, OnInit } from '@angular/core';
import { AppStateService } from 'src/app/app-state.service';

@Component({
  selector: 'app-colleagues-comments',
  templateUrl: './colleagues-comments.component.html',
  styleUrls: ['./colleagues-comments.component.css']
})
export class ColleaguesCommentsComponent {

  @Input() background: any;
  isMobile: boolean;

  constructor(private appStateService: AppStateService) {
    //console.log(this.background)
    this.isMobile = this.appStateService.getIsMobileResolution();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.isMobile = this.appStateService.getIsMobileResolution();
  }

}
