import { Component, OnInit, HostListener } from '@angular/core';
import { AppStateService } from '../app-state.service';
import { ToastrService } from 'ngx-toastr';
import { UtilsService } from 'src/services/utils.service';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
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

  // background classes
  bgDesktopClass: string;
  bgMobileClasses: string[];

  // form data object
  formData: FormGroup;

  constructor(private toastrService: ToastrService,
    private appStateService: AppStateService, private utilsService: UtilsService,
    private swipeRoute: SwipeRouteService, private router: Router) {

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
    this.setBackgroundClasses();
    this.columnClass = this.isMobile ? 'vh-100' : '';
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isMobile = this.appStateService.getIsMobileResolution();
    this.isSmallDesktop = this.appStateService.getIsSmallDesktopResolution();
    this.setBackgroundClasses();
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

  setBackgroundClasses() {
    this.bgDesktopClass = this.isSmallDesktop || this.isMobile ? '' : 'background-desktop';
    this.bgMobileClasses = this.isSmallDesktop || this.isMobile ? ['background-column-1', 'background-column-2'] : ['', ''];
  }

}
