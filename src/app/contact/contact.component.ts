import { Component, OnInit, HostListener } from '@angular/core';
import { AppStateService } from '../app-state.service';
import { ToastrService } from 'ngx-toastr';
import { UtilsService } from 'src/services/utils.service';
import { FormControl, FormGroup } from '@angular/forms';
import { DIRECTION, SwipeRouteService } from 'src/services/swiperoute.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  isMobile: boolean;
  columnClass: string;

  // desktop background config
  changeBackground: boolean;
  backgroundRight: { name: string, pos: string };
  backgroundLeft: { name: string, pos: string };

  // mobile background config
  slide1Background: any;
  slide2Background: any;

  // form data object
  formData: FormGroup;

  constructor(private toastrService: ToastrService,
    private appStateService: AppStateService, private utilsService: UtilsService,
    private swipeRoute: SwipeRouteService, private router: Router) {

    // set background configs
    this.backgroundRight = {
      name: 'quarter-hexagon',
      pos: 'top-right'
    }
    this.backgroundLeft = {
      name: 'quarter-hexagon',
      pos: 'bottom-left'
    }

    this.slide1Background = {
      rightHex: 'quarter-hexagon',
      rightHexPos: 'top-right',
      leftHex: 'hexagon',
      leftHexPos: 'bottom-left'
    }
    this.slide2Background = {
      rightHex: 'quarter-hexagon',
      rightHexPos: 'bottom-right'
    }

    this.formData = new FormGroup({
      email: new FormControl(''),
      subject: new FormControl(''),
      comment: new FormControl('')
    });

  }

  ngOnInit(): void {
    this.isMobile = this.appStateService.getIsMobileResolution();
    this.changeBackground = this.isMobile ? true : false;
    this.columnClass = this.isMobile ? 'vh-100' : '';
    //this.navBarSync.sync();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isMobile = this.appStateService.getIsMobileResolution();
    this.changeBackground = this.isMobile ? true : false;
    this.columnClass = this.isMobile ? 'vh-100' : '';
  }

  copyEmail(val: string) {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.toastrService.success('Email copied successfully to clipboard!');
  }

  onSubmit(data: any) {
    console.log(data);
    this.utilsService.sendEmail(data.email, data.subject, data.comment).subscribe((res) => {
      //console.log(res);
      this.toastrService.success(res.data);
      this.formData = new FormGroup({
        email: new FormControl(''),
        subject: new FormControl(''),
        comment: new FormControl('')
      });
    }, (error: any) => { console.log(error); });
  }

  onSwipe(event: any) {
    const dir = Math.abs(event?.deltaX) > 40 ? (event?.deltaX > 0 ? DIRECTION.right : DIRECTION.left) : DIRECTION.right;
    const newRoute = this.swipeRoute.getNextSwipeRoute('/contact', dir);
    this.router.navigateByUrl(newRoute);
  }

}
