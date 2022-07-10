import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { AppStateService } from '../app-state.service';

@Component({
  selector: 'app-cover',
  templateUrl: './cover.component.html',
  styleUrls: ['./cover.component.css']
})
export class CoverComponent implements OnInit {

  coverPagesId: string[];
  currentPageIndex: number;
  numbersArray: number[];
  solutionArray: number[];
  timer: number;
  timerString: string;
  userFinishTime: string;
  computerFinishTime: string;
  arrayIndex: number;
  cronoInterval: any;
  checkSolutionInterval: any;
  startBool: boolean;
  lastScrollTop: number;
  isAutoScrollOn: boolean;
  scrollTimeout: any;
  // background configs
  coverBackground: any;
  experienceBackground: any;
  projectsBackground: any;
  testiomonialBackground: any;
  isMobile: boolean;

  constructor(private toastrService: ToastrService, private routerService: Router, private appStateService: AppStateService) {
    this.numbersArray = [48, 35, 20, 2, 81, 50, 100, 63, 77, 13];
    this.solutionArray = [2, 13, 20, 35, 48, 50, 63, 77, 81, 100];
    this.timer = 0.0;
    this.timerString = "0.0";
    this.arrayIndex = -1;
    this.startBool = true;
    this.coverPagesId = ["cover-page", "experience-page", "projects-page", "contact-page"];
    this.currentPageIndex = 0;
    this.lastScrollTop = 0;
    this.isAutoScrollOn = false;
    // set background configs
    this.coverBackground = {
      rightHex: 'hexagon',
      rightHexPos: 'bottom-right',
      leftHex: 'quarter-hexagon',
      leftHexPos: 'top-left'
    }
    this.projectsBackground = {
      leftHex: 'hexagon',
      leftHexPos: 'bottom-left'
    }
    this.experienceBackground = {
      rightHex: 'hexagon',
      rightHexPos: 'bottom-right'
    }
    this.testiomonialBackground = {
      leftHex: 'hexagon',
      leftHexPos: 'bottom-left'
    }
  }

  ngOnInit(): void {
    //this.bubbleSort(this.numbersArray,this.numbersArray.length);
    //console.log(this.numbersArray);
    this.isMobile = this.appStateService.getIsMobileResolution();
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.numbersArray, event.previousIndex, event.currentIndex);
  }

  isSolutionCorrect() {
    let arrayDivList = document.getElementById("item-user-list");
    //console.log(arrayDivList);
    for (let i = 0; i < arrayDivList.children.length; i++) {
      let elementValue = Number(arrayDivList.children[i].textContent);
      if (elementValue != this.solutionArray[i]) {
        return false;
      }
    }

    return true;
  }

  swap(arr: Array<number>, xp: number, yp: number) {
    var temp = arr[xp];
    arr[xp] = arr[yp];
    arr[yp] = temp;
  }

  // An optimized version of Bubble Sort
  bubbleSort(arr: Array<number>, n: number) {
    var i, j;
    for (i = 0; i < n; i++) {
      for (j = 0; j < n - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          this.swap(arr, j, j + 1);
          setTimeout(() => {
            moveItemInArray(this.numbersArray, j, j + 1);
          }, 10);
        }
      }
    }
  }

  startGame() {
    this.startBool = false;

    this.startTimer();

    // check array order
    this.checkSolutionInterval = setInterval(() => {
      if (this.isSolutionCorrect()) {
        clearInterval(this.cronoInterval);
        this.cronoInterval = undefined;
        clearInterval(this.checkSolutionInterval);
        this.checkSolutionInterval = undefined;

        // show congrats notification
        this.toastrService.success('¡Congratulations! You ordered the list correctly');

        // store user finish time
        this.userFinishTime = this.timerString;

        // empty card
        document.getElementById('game-card-body').style.setProperty('animation', 'fadeOut');
        document.getElementById('game-card-body').style.setProperty('animation-duration', '2s');

        let transitionInterval = setInterval(() => {
          // restart game settings
          this.timer = 0.0;
          this.timerString = "0.0";
          this.numbersArray = [48, 35, 20, 2, 81, 50, 100, 63, 77, 13];

          document.getElementById('game-card-body').style.setProperty('display', 'none');
          document.getElementById('solution-card-body').style.setProperty('display', 'block');
          document.getElementById('solution-card-body').style.setProperty('animation', 'fadeIn');
          document.getElementById('solution-card-body').style.setProperty('animation-duration', '2s');

          clearInterval(transitionInterval);
          transitionInterval = undefined;

        }, 2000);
      }
    }, 100);
  }

  displayFinalExplanation() {
    document.getElementById('intro-demo-text').style.setProperty('animation', 'fadeOut');
    document.getElementById('intro-demo-text').style.setProperty('animation-duration', '2s');

    document.getElementById('final-demo-text').style.setProperty('animation', 'fadeIn');
    document.getElementById('final-demo-text').style.setProperty('animation-duration', '2s');

    setTimeout(() => {
      document.getElementById('intro-demo-text').style.setProperty('display', 'none');
      document.getElementById('final-demo-text').style.setProperty('display', 'block');
    }, 2000);
  }

  sortArrayDemo() {
    setTimeout(() => {
      this.startBool = true;
      this.startTimer();
      setTimeout(() => {
        let arrayToOrder = this.numbersArray;
        this.bubbleSort(arrayToOrder, arrayToOrder.length);
        clearInterval(this.cronoInterval);
        this.cronoInterval = undefined;
        this.computerFinishTime = this.timerString;
      }, 100);
      this.displayFinalExplanation();
    }, 2300);
  }

  startDemo() {
    document.getElementById('demo-button').style.setProperty('animation', 'fadeOut');
    document.getElementById('demo-button').style.setProperty('animation-duration', '2s');

    document.getElementById('demo-timer').style.setProperty('animation', 'fadeIn');
    document.getElementById('demo-timer').style.setProperty('animation-duration', '2s');

    document.getElementById('item-sol-list').style.setProperty('animation', 'fadeIn');
    document.getElementById('item-sol-list').style.setProperty('animation-duration', '2s');

    setTimeout(() => {
      document.getElementById('demo-button').style.setProperty('display', 'none');
      document.getElementById('demo-timer').style.setProperty('display', 'block');
      document.getElementById('item-sol-list').style.setProperty('display', 'flex');

      this.sortArrayDemo();
    }, 2000);
  }

  startTimer() {
    this.cronoInterval = setInterval(() => {
      this.timerString = (Math.round((this.timer += 0.1) * 100) / 100).toFixed(1);
    }, 100);
  }
}
