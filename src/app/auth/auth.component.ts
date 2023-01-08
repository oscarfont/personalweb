import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  name: string;
  formData: FormGroup;
  errorMessage: string;

  constructor(public activeModal: NgbActiveModal, public authService: AuthService,
    public router: Router, private toastrService: ToastrService,) { }

  ngOnInit() {
    if (this.isUserLoggedIn()) this.name = this.authService.getCookie('username');
    this.formData = new FormGroup({
      userName: new FormControl('', [Validators.required, this.userNameValidator(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]),
      password: new FormControl('', [Validators.required]),
    });
  }

  userNameValidator(nameRe: RegExp): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const isValidEmail = nameRe.test(control.value);
      return isValidEmail ? null : { isValidEmail: true };
    };
  }

  get userName() { return this.formData.get('userName') }
  get password() { return this.formData.get('password') }

  onSignIn() {
    //console.log("Login page: " + this.userName);
    //console.log("Login page: " + this.password);

    this.authService.login(this.userName.value, this.password.value)
      .subscribe((res) => {
        const data = res.data;

        this.errorMessage = "";

        // set cookie with jwt token
        document.cookie = `token=${data.jwt}`;
        document.cookie = `username=${data.name}`;

        // close modal
        this.closeModal();
        this.name = data.name

        // show login success message
        this.toastrService.success('Welcome ' + this.name + '!');

        // redirect to blog posts
        if (data) this.router.navigate(['/blog']);

      },
        (response) => {
          this.errorMessage = response.error.message;
        });
  }

  onSignOut() {
    this.authService.logout();
    this.formData = new FormGroup({
      userName: new FormControl(''),
      password: new FormControl('')
    });
  }

  closeModal() {
    this.activeModal.close();
  }

  isUserLoggedIn() {
    return this.authService.isUserLoggedIn();
  }

}
