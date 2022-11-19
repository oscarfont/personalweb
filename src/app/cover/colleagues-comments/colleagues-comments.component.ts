import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-colleagues-comments',
  templateUrl: './colleagues-comments.component.html',
  styleUrls: ['./colleagues-comments.component.css']
})
export class ColleaguesCommentsComponent implements OnInit {

  @Input() background: any;

  constructor() {
    console.log(this.background)
  }

  ngOnInit(): void {

  }

}
