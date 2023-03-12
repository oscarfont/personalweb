import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  @Input() companyImageSrc: string;
  @Input() comment: string;
  @Input() name: string;
  @Input() project: string;
  @Input() socialMedia: { image: string, profileLink: string }

  constructor() { }

  ngOnInit(): void {
    this.name = this.name ? this.name : 'Someone';
  }

}
