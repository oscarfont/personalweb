import { Component, HostListener, Input, OnInit } from '@angular/core';
import { AppStateService } from 'src/app/app-state.service';
import { UtilsService } from 'src/services/utils.service';

type ColleagueComment = {
  companyImageSrc: string;
  comment: string;
  name?: string;
  project: string;
  socialMedia?: { image: string, profileLink: string }
}

@Component({
  selector: 'app-colleagues-comments',
  templateUrl: './colleagues-comments.component.html',
  styleUrls: ['./colleagues-comments.component.css']
})
export class ColleaguesCommentsComponent implements OnInit {

  @Input() background: any;
  isMobile: boolean;
  comments: ColleagueComment[];

  constructor(private appStateService: AppStateService, private utilsService: UtilsService) {
    //console.log(this.background)
    this.isMobile = this.appStateService.getIsMobileResolution();
  }

  ngOnInit(): void {
    this.utilsService.getColleaguesComments().subscribe((data) => this.comments = data?.comments);
    console.log(this.comments);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.isMobile = this.appStateService.getIsMobileResolution();
  }

}
