import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";


@Injectable({
  providedIn: 'root'
})


export class AuthService {

  private url = 'https://web-177j.onrender.com/api'

  constructor(private http: HttpClient, private router: Router, private cookieService: CookieService) { }

  register(user: any) {
    return this.http.post(this.url + '/register', user);
  }

  logIn(user: any) {
    return this.http.post(this.url + '/signin', user);
  }

  requestPasswordReset(email: string) {
    return this.http.post(this.url + '/request-password-reset', { email });
  }

  resetPassword(email: string, newPassword: string, resetCode?: number) {
    return this.http.post(this.url + '/reset-password', { email, newPassword, resetCode });
  }

  addProduct(product: any) {
    return this.http.post(this.url + '/products/add', product);
  }

  updateProduct(id: string, productData: any) {
    return this.http.put(this.url + `/product/${id}`, productData);
  }

  deleteProduct(id: string) {
    return this.http.delete(this.url + `/product/${id}`);
  }

  getProducts() {
    return this.http.get(this.url + '/products');
  }

  loggedIn() {
    return this.cookieService.check('token');
  }

  getToken() {
    return this.cookieService.get('token');
  }

  getUserRole() {
    return this.cookieService.get('userRole');
  }

  userIsAdmin() {
    return this.cookieService.get('userRole') === 'admin';
  }

  userIsCliente() {
    return this.cookieService.get('userRole') === 'cliente';
  }

  signOut() {
    this.cookieService.delete('token');
    this.cookieService.delete('userRole');
    this.router.navigate(['/inicio-sesion']);
  }

}
