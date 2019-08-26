import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { UserInterface, User, tokenResp, userClaims } from '../modelo/Interfaces';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly rootUrl: string = "https://localhost:44348";

  constructor(private http: HttpClient) { }

  registerUser(user: User,roles:string[]) {
    const body = {
      UserName: user.UserName,
      Password: user.Password,
      FirstName: user.FirstName,
      LastName: user.LastName,
      Roles: roles
    }
    var reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    return this.http.post(this.rootUrl + "/api/User/Register", body, { headers: reqHeader });
  }

  userAuthentication(userName, password) {
    var data = "username=" + userName + "&password=" + password + "&grant_type=password";
    var reqHeader = new HttpHeaders({ "Content-Type": "application/x-www-form-urlencoded", 'No-Auth': 'True' });
    return this.http.post(this.rootUrl + '/token', data, { headers: reqHeader });
  }

  getUserClaims():Observable<userClaims> {
    return this.http.get<userClaims>(this.rootUrl + '/api/GetUserClaims');
  }

  getAllRoles() {
    var reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    return this.http.get(this.rootUrl + '/api/GetAllRoles', { headers: reqHeader });
  }

  roleMatch(allowedRoles): boolean {
    var isMatch = false;
    var userRoles: string[] = JSON.parse(localStorage.getItem('userRole'));
    allowedRoles.forEach(element => {
      if (userRoles.indexOf(element) > -1) {
        isMatch = true;
        return false;
      }
    });
    return isMatch
  }


  // headers: HttpHeaders = new HttpHeaders({ "Content-Type": "application/json" });
  loginUser(name: string, email: string, password: string) {
    // const url_api = "https://localhost:44348/api/login/authenticate";
    // return this.http.post(url_api,
    //   {
    //     Username: name,
    //     Password: password
    //   },
    //   { headers: this.headers }
    // ).pipe(map(data => data));
    return null;
  }

  // getUserRol(userName: string): Observable<UserRole> {
  //   const url_api0 = "https://localhost:44348/api/Rol/getRole?userName=" + userName;
  //   console.log(url_api0);
  //   return this.http.get<UserRole>(url_api0);
  // }

  // registerUser(name: string, email: string, password: string) {
  //   const url_api = "https://localhost:44348/api/login/authenticate";
  //   return this.http.post(url_api, {
  //     Username: name,
  //     Password: password
  //   }, { headers: this.headers }
  //   ).pipe(map(data => data));
  // }

  // userRol(name: string, password: string) {
  //   const url_api0 = "https://localhost:44348/api/Rol/getRole";
  //   return this.http.post(url_api0,
  //     {
  //       Username: name,
  //       Password: password
  //     }
  //   ).pipe(map(data => data));
  // }

  // postloginUser(_body: UserInterface): Observable<UserInterface> {
  //   const url_api = "https://localhost:44374/api/login/authenticate";
  //   return this.http.post<UserInterface>(url_api , _body);
  // }

  setUser(user: string): void {
    let user_string = user //JSON.stringify(user);
    localStorage.setItem("currentUser", user_string);
    console.log(user_string);
  }

  // getUserLS(): string {
  //   return localStorage.getItem("currentUser");
  // }

  setToken(token): void {
    localStorage.setItem("Token", token);
  }

  getToken() {
    return localStorage.getItem("Token");
  }

  loggedIn() {
    return !!localStorage.getItem('Token');
  }

  getCurrentUser(): UserInterface {
    let user_string = localStorage.getItem("currentUser");
    if (!isNullOrUndefined(user_string)) {
      let user: UserInterface = JSON.parse(user_string);
      return user;
    }
    else {
      return null;
    }
  }

  logoutUser() {
    localStorage.removeItem('Token');
    localStorage.removeItem('currentUser');
  }
}


// https://www.youtube.com/watch?v=Ks5ADKqPrBQ
