import { Component, OnInit, HostListener } from '@angular/core';
import { AppStateService } from '../app-state.service';
import { ToastrService } from 'ngx-toastr';
import { UtilsService } from 'src/services/utils.service';
import { AbstractControl, AsyncValidator, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { DIRECTION, SwipeRouteService } from 'src/services/swiperoute.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  isMobile: boolean;
  isSmallDesktop: boolean;
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
      email: new FormControl('', [Validators.required, this.emailValidator(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]),
      subject: new FormControl('', [Validators.required]),
      comment: new FormControl('', [Validators.required])
    });

  }

  get email() { return this.formData.get('email') }
  get subject() { return this.formData.get('subject') }
  get comment() { return this.formData.get('comment') }

  emailValidator(nameRe: RegExp): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const isValidEmail = nameRe.test(control.value);
      return isValidEmail ? null : { isValidEmail: true };
    };
  }


  ngOnInit(): void {
    this.isMobile = this.appStateService.getIsMobileResolution();
    this.isSmallDesktop = this.appStateService.getIsSmallDesktopResolution();
    this.changeBackground = this.isSmallDesktop ? true : false;
    this.columnClass = this.isMobile ? 'vh-100' : '';
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isMobile = this.appStateService.getIsMobileResolution();
    this.isSmallDesktop = this.appStateService.getIsSmallDesktopResolution();
    this.changeBackground = this.isSmallDesktop ? true : false;
    this.columnClass = this.isMobile ? 'vh-100' : '';
  }

  onSubmit(data: any) {
    console.log(data);
    this.utilsService.sendEmail(data.email, data.subject, data.comment).subscribe((res) => {
      this.toastrService.success(res.data);
      this.formData = new FormGroup({
        email: new FormControl(''),
        subject: new FormControl(''),
        comment: new FormControl('')
      });
    }, (error: any) => { console.log(error); });
  }

  onSwipe(event: any) {
    if (this.isMobile) {
      const dir = Math.abs(event?.deltaX) > 40 ? (event?.deltaX > 0 ? DIRECTION.right : DIRECTION.left) : DIRECTION.right;
      const newRoute = this.swipeRoute.getNextSwipeRoute('/contact', dir);
      this.router.navigateByUrl(newRoute);
    }
  }

}
