import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-cover',
  templateUrl: './cover.component.html',
  styleUrls: ['./cover.component.css']
})
export class CoverComponent implements OnInit {

  numbersArray : number[];
  solutionArray : number[];
  timer : number;
  timerString : string;
  arrayIndex : number;
  cronoInterval : any;
  checkSolutionInterval : any;

  constructor() { 
    this.numbersArray = [48,35,20,2,81,50,100,63,77,13];
    this.solutionArray = [2,13,20,35,48,50,63,81,77,100];
    this.timer = 0.0;
    this.timerString = "0.0";
    this.arrayIndex = -1;
  }

  ngOnInit(): void {  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.numbersArray, event.previousIndex, event.currentIndex);
  }

  isSolutionCorrect(){
    let arrayDivList = document.getElementById("element-user-list");
    for(let i = 0; i < arrayDivList.children.length; i++){
      let elementValue = Number(arrayDivList.children[i].textContent);
      if(elementValue != this.solutionArray[i]){
        return false;
      }
    }

    return true;
  }

  startGame(){
    this.startTimer();

    // check array order
    this.checkSolutionInterval = setInterval(() => {
      if(this.isSolutionCorrect()){
        clearInterval(this.cronoInterval);
        this.cronoInterval=undefined;
        clearInterval(this.checkSolutionInterval); 
        this.checkSolutionInterval  = undefined;
      }
    }, 100);
  }

  startTimer(){
    this.cronoInterval = setInterval(() => {
      this.timerString = (Math.round((this.timer += 0.1)*100)/100).toFixed(1);
    },100);
  }

}
