import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.css']
})
export class BackgroundComponent implements OnInit {

  @Input() leftHex: string;
  @Input() leftHexPos: string;
  @Input() rightHex: string;
  @Input() rightHexPos: string;
  @Input() positioned: boolean;

  ngOnInit(): void { }
}
