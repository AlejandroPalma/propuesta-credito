import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm, Validators, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { User, tokenResp } from 'src/app/modelo/Interfaces';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  user: User;
  // isValidFormSubmitted = null;
  isLoginError: boolean = false;
  userForm = new FormGroup({
    UserName: new FormControl('', [Validators.required]),
    Password: new FormControl('', [Validators.required, Validators.minLength(5)])
  });

  constructor(public authService: AuthService,
    private localstorage: LocalStorageService,
    private router: Router) { }

  ngOnInit() { }

  onSubmit(userName, password) {
    this.authService.userAuthentication(userName, password).subscribe((data: any) => {
      localStorage.setItem('userToken', data.access_token);
      localStorage.setItem('userRole', data.role);
      localStorage.setItem('id', data.Id);
      this.localstorage.setUserID(data.Id);

      this.router.navigate(['home']);
    },
      (err: HttpErrorResponse) => {
        this.isLoginError = true;
      });
  }

  revert() {
    this.userForm.reset();
  }
}


