import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm, Validators, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserInterface, UserRole, User } from 'src/app/modelo/Interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  user: User;
  isValidFormSubmitted = null;
  roles: any[];

  userForm = new FormGroup({
    UserName: new FormControl('', [Validators.required]),
    Password: new FormControl('', [Validators.required, Validators.minLength(5)]),
    Roles: new FormControl('', [Validators.required]),
    FirstName: new FormControl('', [Validators.required]),
    LastName: new FormControl('', [Validators.required])
  });

  constructor(public authService: AuthService, private localstorage: LocalStorageService,
    private router: Router) { }

  ngOnInit() {
    this.revert();
    this.authService.getAllRoles().subscribe(
      (data: any) => {
        data.forEach(obj => obj.selected = false);
        this.roles = data;
      }
    );
  }

  revert() {
    this.userForm.reset();
    if(this.roles)
    {
      this.roles.map(x => x.selected = false);
    }
  }

  selectRole(event, index) {
    console.log(index);
    this.roles[index].selected = !this.roles[index].selected;
  }

  onSubmit(form: NgForm) {
    var x = this.roles.filter(x => x.selected).map(y => y.Name);
    this.authService.registerUser(form.value, x).subscribe((data: any) => {
      if (data.Succeeded == true) { 
        this.revert(); 
        // this.router.navigate(['login']);
      }
    });
  }

}



