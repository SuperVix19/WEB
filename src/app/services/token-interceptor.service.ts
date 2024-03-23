// import { Injectable } from '@angular/core';
// import { AuthService} from './auth.service';

// export class TokenInterceptorService {

//     constructor(private authService: AuthService) { }
    
//     intercept(req: any, next: any){
//       const tokenizeReq = req.clone({setHeaders: {Authorization: `Bearer ${this.authService.getToken()}`}});
      
//       return next.handle(tokenizeReq);
//     }
  
  
// }