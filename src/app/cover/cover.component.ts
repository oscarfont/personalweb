import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ToastrService } from 'ngx-toastr';
import { AppStateService } from '../app-state.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { DIRECTION, SwipeRouteService } from 'src/services/swiperoute.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cover',
  templateUrl: './cover.component.html',
  styleUrls: ['./cover.component.css']
})
export class CoverComponent implements OnInit {

  coverPagesId: string[];
  currentPageIndex: number;
  numbersArray: number[] = [];
  solutionArray: number[] = [];
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
  testimonialBackground: any;
  isMobile: boolean;

  constructor(private toastrService: ToastrService, private appStateService: AppStateService,
    private deviceService: DeviceDetectorService, private swipeRoute: SwipeRouteService,
    private router: Router) {
    this.generateGameArrays();
    this.timer = 0.00;
    this.timerString = "0.00";
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
    this.testimonialBackground = {
      leftHex: 'hexagon',
      leftHexPos: 'bottom-left'
    }
  }

  ngOnInit(): void {
    //this.bubbleSort(this.numbersArray,this.numbersArray.length);
    //console.log(this.numbersArray);
    this.isMobile = this.appStateService.getIsMobileResolution();
  }

  generateGameArrays() {
    const maxNumber = 99;
    const arraysLength = 10;
    const tmpArray = []
    for (let i = 0; i < arraysLength; i++) {
      tmpArray.push(Math.floor(Math.random() * maxNumber) + 1);
    }
    this.numbersArray = tmpArray.concat();
    this.solutionArray = tmpArray.sort((a, b) => a - b);
    //console.log(this.solutionArray);
  }

  getDeviceInfoString(): string {
    let outString = '';
    const deviceInfo = this.deviceService.getDeviceInfo();
    if (this.deviceService.isDesktop()) {
      outString = `${deviceInfo.browser} on your ${deviceInfo.os} ${deviceInfo.deviceType}`;
    } else {
      outString = `your ${deviceInfo.device}`;
    }
    return outString;
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
          }, 1);
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
          this.timer = 0.00;
          this.timerString = "0.00";
          this.generateGameArrays();

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
      }, 10);
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
      this.timerString = (Math.round((this.timer += 0.01) * 1000) / 1000).toFixed(2);
    }, 10);
  }

  onSwipe(event: any) {
    const dir = Math.abs(event?.deltaX) > 40 ? (event?.deltaX > 0 ? DIRECTION.right : DIRECTION.left) : DIRECTION.right;
    const newRoute = this.swipeRoute.getNextSwipeRoute('/home', dir);
    this.router.navigateByUrl(newRoute);
  }
}
