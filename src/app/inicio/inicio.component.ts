import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppModule } from '../app.module';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-inicio',
  standalone: false,
  // imports: [RouterModule, AppModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent implements OnInit{

  constructor(private authService: AuthService){}

  ngOnInit(): void {}

  title = 'web';

  productos = [
    {
      description: 'Descripción del producto.',
      price: '$19.99',
      priceTwo: '$39.99'
    }
  ]

  loggedIn(){
    this.authService.loggedIn();
  }

  signOut(){
    this.authService.signOut();
  }

  userIsAdmin(){
    return this.authService.userIsAdmin();
  }

  userIsCliente(){
    return this.authService.userIsCliente();
  }

}
