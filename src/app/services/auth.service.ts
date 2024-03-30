import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";


@Injectable({
  providedIn: 'root'
})


export class AuthService {
  
  private url = 'https://web-177j.onrender.com/api'
  
  constructor(private http: HttpClient, private router: Router) {}

  register(user: any){
    return this.http.post(this.url + '/register', user);
  }

  logIn(user: any){
    return this.http.post(this.url + '/signin', user);
  }

  loggedIn(){
    return !!localStorage.getItem('token');
  }

  getToken(){
    return localStorage.getItem('token');
  }

  singOut(){
    localStorage.removeItem('token');
    this.router.navigate(['/inicio-sesion']);
  }

}
