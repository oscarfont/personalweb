import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  userName: string;
  password: string;
  name: string;
  formData: FormGroup;
  errorMessage: string;

  constructor(public activeModal: NgbActiveModal, public authService: AuthService,
    public router: Router, private toastrService: ToastrService,) { }

  ngOnInit() {
    this.formData = new FormGroup({
      userName: new FormControl(""),
      password: new FormControl(""),
    });
  }

  onSignIn(data: any) {
    this.userName = data.userName;
    this.password = data.password;

    //console.log("Login page: " + this.userName);
    //console.log("Login page: " + this.password);

    this.authService.login(this.userName, this.password)
      .subscribe((res) => {
        const data = res.data;

        this.errorMessage = "";

        // set cookie with jwt token
        document.cookie = `token=${data.jwt}`;
        document.cookie = `username=${data.name}`;

        // close modal
        //this.closeModal();
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
      userName: new FormControl(""),
      password: new FormControl(""),
    });
  }

  closeModal() {
    this.activeModal.close();
  }

  isUserLoggedIn() {
    return this.authService.isUserLoggedIn();
  }

}
