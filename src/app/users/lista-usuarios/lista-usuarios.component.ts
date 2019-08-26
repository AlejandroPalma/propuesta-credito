import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm, Validators, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { CargosService } from 'src/app/services/cargos.service';
import { UserInterface, UserRole, User } from 'src/app/modelo/Interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit {
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

  constructor(public authService: AuthService, private cargo: CargosService,
    private router: Router) { }

  ngOnInit() {
    this.revert();
    this.authService.getAllRoles().subscribe(
      (data: any) => {
        data.forEach(obj => obj.selected = false);
        this.roles = data;
      }
    );

    this.listadeUSuarios();
  }

  revert() {
    this.userForm.reset();
    if(this.roles)
    {
      this.roles.map(x => x.selected = false);
    }
  }

  selectRole(event, index) {
    this.roles[index].selected = !this.roles[index].selected;
  }

  onSubmit(form: NgForm) {
    var x = this.roles.filter(x => x.selected).map(y => y.Name);
    this.authService.registerUser(form.value, x).subscribe((data: any) => {
      if (data.Succeeded == true) { 
        this.revert(); 
      }
    });
  }

  listadeUSuarios(){
    this.cargo.getDataNetUser().subscribe(
      (data: any) => {
          this.user = data;
          console.log(this.user);
      }
    );
  }

}



