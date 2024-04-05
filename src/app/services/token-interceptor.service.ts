import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";

@Injectable({
    providedIn: 'root'
})

export class TokenInterceptorService {

    constructor(private authService: AuthService) { }

    intercept(req: any, next: any) {
        const tokenizeReq = req.clone({ setHeaders: { Authorization: `Bearer ${this.authService.getToken()}` } });

        const setRoleReq = req.clone({ setHeaders: { userRole: `${this.authService.getUserRole()}` } });

        return next.handle(tokenizeReq, setRoleReq);
    }

}
