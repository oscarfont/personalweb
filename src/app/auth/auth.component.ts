import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl} from '@angular/forms';
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
  formData: FormGroup;
  errorMessage: string;

  constructor(public activeModal: NgbActiveModal, public authService: AuthService, 
              public router: Router, private toastrService : ToastrService,) {}

  ngOnInit(){
    this.formData = new FormGroup({
      userName: new FormControl(""),
      password: new FormControl(""),
    });
  }

  onClickSubmit(data: any) {
    this.userName = data.userName;
    this.password = data.password;

    console.log("Login page: " + this.userName);
    //console.log("Login page: " + this.password);

    this.authService.login(this.userName, this.password)
       .subscribe( (data) => { 

        this.errorMessage = "";

        // set cookie with jwt token  
        document.cookie = `token=${data.token}`;
        document.cookie = `username=${data.username}`;
        
        // close modal
        this.closeModal();

        // show login success message
        this.toastrService.success('Welcome '+ data.username + '!');
        
        // redirect to blog posts
        if(data) this.router.navigate(['/blog']);

      },
      (response) => {
        this.errorMessage = response.error.message;
      });
 }

  closeModal() {
    this.activeModal.close();
  }

}
