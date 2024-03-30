import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { AuthService } from "./services/auth.service";
import { Observable } from "rxjs";

export class AuthGuard implements CanActivate {

  // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
  //   throw new Error("Method not implemented.");
  // }

  constructor(private authService: AuthService, private router: Router){}

  canActivate(): boolean{
    if (this.authService.loggedIn()){
      return true;
    }

    this.router.navigate(['./formulario']);

    return false;
  }
}
