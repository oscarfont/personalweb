import { Component, OnInit } from '@angular/core';
import { faFrown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.css']
})
export class NotfoundComponent {

  sadFaceIcon = faFrown;

  constructor() { }

}
