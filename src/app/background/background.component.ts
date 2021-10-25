import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.css']
})
export class BackgroundComponent implements OnInit {

  @Input() first : boolean;
  @Input() numberOfScreen : number;
  topLeftID : string;
  bottomRightID : string;
  topRightID : string;
  bottomLefttID : string;
  figureHeight : any;

  constructor() { }

  setCornerPositions(){
    /*if(document.getElementById(this.topLeftID) != null){
      document.getElementById(this.topLeftID).style.top = (this.numberOfScreen*100).toString() + 'vh';
    }*/

    /*if(document.getElementById(this.bottomRightID) != null){
      document.getElementById(this.bottomRightID).style.top = 'calc('+((100 + this.numberOfScreen*100)).toString() + 'vh';
    }*/

    /*if(document.getElementById(this.topRightID) != null){
      document.getElementById(this.topRightID).style.top = (this.numberOfScreen*100).toString() + 'vh';
    }*/

    /*if(document.getElementById(this.bottomLefttID) != null){
      document.getElementById(this.bottomLefttID).style.top = 'calc('+((100 + this.numberOfScreen*100)).toString() + 'vh';
    }*/
  }

  ngOnInit(): void {
    this.topLeftID = 'top-left-corner-'+this.numberOfScreen.toString();
    this.bottomRightID = 'bottom-right-corner-'+this.numberOfScreen.toString();
    this.topRightID = 'top-right-corner-'+this.numberOfScreen.toString();
    this.bottomLefttID = 'bottom-left-corner-'+this.numberOfScreen.toString();
  }

  /*ngAfterViewInit(){
    this.setCornerPositions();
  }*/

}
